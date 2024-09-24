'use server';

import {
	addDays,
	addHours,
	addYears,
	format,
	isBefore,
	isSameDay,
	isWithinInterval,
	parse,
	setHours,
} from 'date-fns';
import en from 'date-fns/locale/en-US';
import fi from 'date-fns/locale/fi';
import { revalidateTag } from 'next/cache';
import { GET } from './wrappers';

// Restaurants available in the Unicafe API
export type Restaurants =
	| 'Tähkä'
	| 'Biokeskus 3'
	| 'Infokeskus alakerta'
	| 'Myöhä Café & Bar'
	| 'Kaivopiha'
	| 'Kaisa-talo'
	| 'Viikuna'
	| 'Soc&Kom'
	| 'Rotunda'
	| 'Porthania Opettajien ravintola'
	| 'Porthania'
	| 'Physicum'
	| 'Topelias'
	| 'Olivia'
	| 'Metsätalo'
	| 'Meilahti'
	| 'Infokeskus'
	| 'Exactum'
	| 'Chemicum'
	| 'Chemicum Opettajien ravintola'
	| 'Cafe Portaali';

// Type of data fetched from the Unicafe API
type RestaurantData = {
	id: number;
	title: string;
	menuData: {
		name: string;
		visitingHours: {
			lounas: {
				items: {
					closedException: boolean;
					exception: boolean;
					label: string;
					hours: string;
				}[];
			};
		};
		menus: {
			date: string;
			data: {
				name: string;
				price: {
					name: string;
					value: {
						student: string;
						student_hyy: string;
						graduate: string;
						graduate_hyy: string;
						contract: string;
						normal: string;
					};
				};
				meta: {
					'0': string[]; // Diets
					'1': string[]; // Allergies
					'2': string[]; // Responsibility
				};
			}[];
		}[];
	};
};

// Type of food data returned by the Unicafe API
type FoodData = RestaurantData['menuData']['menus'][number]['data'][number];

// Type of food data to be returned to the component
type Food = {
	name: string;
	category: string;
	price: string;
	meta: {
		diet: string[];
		allergies: string[];
		responsibility: string[];
	};
};

// Type of data to be returned to the component
export type Restaurant = {
	name: string;
	menuGroups: Partial<Record<string, Food[]>>;
	lunchHours: string;
	openingHour: Date | undefined;
	closingHour: Date | undefined;
};

// Testing offset in hours
const testingOffset = 0;

const getNow = () =>
	process.env.NODE_ENV === 'development'
		? addHours(new Date(), testingOffset)
		: new Date();

// Find a menu for the current day and map it to the component format
const getMenu = (restaurant: RestaurantData): Food[] | undefined =>
	restaurant.menuData.menus
		.find(
			({ date }) =>
				date === format(getNow(), 'EEE dd.MM.', { locale: en })
		)
		?.data.map(mapFood);

// Map food data to the component format
const mapFood = ({ name, price, meta }: FoodData): Food => {
	return {
		name,
		category: price.name,
		price:
			Number(price.value.student || price.value.student_hyy) !== 0
				? price.value.student || price.value.student_hyy
				: price.value.contract || price.value.normal,
		meta: {
			diet: meta['0'].map((diet) => (diet === '[S]' ? 'KELA' : diet)),
			allergies: meta['1'],
			responsibility: Array.isArray(meta['2']) ? meta['2'] : [meta['2']],
		},
	};
};

// Group food by price category: vegan, meat, special, notices
const groupByPriceCategory = (menu: Food[]) =>
	Object.fromEntries(
		Map.groupBy(menu, (food) => food.category.toLowerCase())
	);

/*
Parse lunch times and exceptions and find the current days correct hours

Opening times are (probably) in format 11:00–14:00 (with an em dash, not a hyphen, probably)

Normal day labels are (probably) in format "Ma" or "Ma–To" (again with an em dash)

Exception day labels are (probably) in format "23.1." or "2.11.–13.11." (again with an em dash)

Exceptions are (usually) in format 11:00–14:00 (again with an em dash) or "Suljettu"

Exceptions seem to have property "exception" set to true but no property "closedException"
even though normal days have "closedException" set to false but no "exception" property

I'M SO SORRY TO ANYONE WHO HAS TO READ THE FOLLOWING MONSTROSITY
*/
const getLunchHours = (restaurant: RestaurantData) => {
	// Group times by exceptions and normal open times
	const times = Object.groupBy(
		restaurant.menuData.visitingHours.lounas.items,
		(times) => {
			if (times.closedException) {
				// If hours are '11:00–19:45' and the label is 'ma-pe', this is a mistake and should be 'normal'
				// This is a horrid hack. I'm so sorry.
				// FIXME: Remove this as soon as Unicafe API gives a sensible response
				if (times.hours === '11:00–19:45' && times.label === 'Ma–Pe') {
					return 'normal';
				}

				return 'exceptions';
			}

			if (times.exception) {
				return 'exceptions';
			}

			return 'normal';
		}
	);

	// Get string representation for the day's opening and closing hours for lunch
	const lunchHours =
		// Check if there is an exception for the current day
		times.exceptions?.find((time) => {
			// Check if the exception is a range of days
			if (time.label.includes('–')) {
				const [startDate, endDate] = time.label
					.split('–')
					.map(
						(date) =>
							parse(date, 'd.M.', setHours(getNow(), 0)) ||
							undefined
					);

				// Check if current date is in that range
				return isWithinInterval(getNow(), {
					start: startDate,
					end: addDays(
						// Add a day so that the end date is inclusive
						isBefore(endDate, startDate)
							? addYears(endDate, 1) // If the end date is the next year, it ends up at the start of the year at first so we have to add a year
							: endDate,
						1
					),
				});
			}

			// If the exception is a single day check if it's today
			const date = parse(time.label, 'd.M.', getNow());
			return isSameDay(date, getNow());
		})?.hours ??
		// Otherwise find the normal open hours by weekdays
		times.normal?.find((time) => {
			// Check if the weekdays are a range
			if (time.label.includes('–')) {
				const [startDay, endDay] = time.label.split('–').map(
					(date) =>
						parse(date, 'cccccc', setHours(getNow(), 0), {
							locale: fi,
						}) || undefined
				);

				// Check if current date is in that range
				return isWithinInterval(getNow(), {
					start: startDay,
					end: addDays(
						isBefore(endDay, startDay)
							? addYears(endDay, 1)
							: endDay,
						1
					),
				});
			}

			// If it is a single weekday check if that is today
			const day = parse(time.label, 'cccccc', getNow(), {
				locale: fi,
			});
			return isSameDay(day, getNow());
		})?.hours ??
		// Otherwise return the opening hours of the first entry in the list
		// This should be Mon-Fri or the most common range for the restaurant
		restaurant.menuData.visitingHours.lounas.items?.[0].hours;

	// If the hours is not a range of times e.g. "Suljettu" return the lunch hours as is
	if (!lunchHours?.includes('–'))
		return {
			lunchHours,
			openingHour: undefined,
			closingHour: undefined,
		};

	// Get the actual opening and closing times
	const [openingHour, closingHour] = lunchHours
		.split('–')
		.map((hour) => parse(hour, 'HH:mm', getNow()) || undefined);

	return {
		lunchHours,
		openingHour,
		closingHour,
	};
};

const BASE_URL = 'https://unicafe.fi/wp-json/swiss/v1/restaurants/?lang=en';

const fetchTag = 'restaurants';

/**
 * Fetches the specified restaurants from the Unicafe API
 * @param restaurants Restaurants to fetch in the order they should be displayed
 * @returns Restaurants with a non-empty menu that are currently open
 */
export const getRestaurants = async (
	restaurants: Restaurants[]
): Promise<Restaurant[]> =>
	await GET<RestaurantData[]>(BASE_URL, {
		next: {
			tags: [fetchTag],
			revalidate: 3600,
		},
	}).then((allRestaurants) =>
		allRestaurants
			// Only include specified restaurants
			.filter(
				(
					restaurant
				): restaurant is RestaurantData & { title: Restaurants } =>
					restaurants.some((name) => restaurant.title === name)
			)
			// Sort restaurants in the order specified in the input array
			.sort(
				(a, b) =>
					restaurants.indexOf(a.title) - restaurants.indexOf(b.title)
			)
			// Map data to component format
			.map((restaurant) => ({
				name: restaurant.menuData.name,
				menuGroups: groupByPriceCategory(getMenu(restaurant) ?? []),
				...getLunchHours(restaurant),
			}))
			// Filter out restaurants that have an empty menu
			.filter(
				(restaurant) =>
					restaurant.menuGroups &&
					Object.values(restaurant.menuGroups).flat().length > 0
			)
			// Only include restaurants that are currently open or opening today
			// Include restaurants that don't have properly resolving opening hours in case there actually is a menu available for that day
			.filter(
				(restaurant) =>
					!restaurant.openingHour ||
					!restaurant.closingHour ||
					isWithinInterval(getNow(), {
						start: setHours(restaurant.openingHour, 6),
						end: restaurant.closingHour,
					})
			)
	);

export const revalidateRestaurants = async () => {
	'use server';
	revalidateTag(fetchTag);
};
