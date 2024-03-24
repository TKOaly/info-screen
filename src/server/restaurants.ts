'use server';

import {
	addHours,
	addMinutes,
	format,
	isWithinInterval,
	parse,
} from 'date-fns';
import en from 'date-fns/locale/en-US';
import { revalidateTag } from 'next/cache';
import { groupBy } from 'ramda';
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

// Type of food data to be returned to the client
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

// Type of data to be returned to the client
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

// Find a menu for the current day and map it to the client format
const getMenu = (restaurant: RestaurantData): Food[] | undefined =>
	restaurant.menuData.menus
		.find(
			({ date }) =>
				date === format(getNow(), 'EEE dd.MM.', { locale: en })
		)
		?.data.map(mapFood);

// Map food data to the client format
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
const groupByPriceCategory = groupBy(({ category }: Food) =>
	category.toLowerCase()
);

// Parse lunch hours and convert them to UTC
const getLunchHours = (restaurant: RestaurantData) => {
	const lunchHours =
		restaurant.menuData.visitingHours.lounas.items?.[0].hours;
	const [openingHour, closingHour] = lunchHours
		.split('–')
		.map((hour) => parse(hour, 'HH:mm', getNow()) || undefined);

	return {
		lunchHours, // String representation for display
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
): Promise<Restaurant[]> => {
	return await GET<RestaurantData[]>(BASE_URL, {
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
			// Map data to client format
			.map((restaurant) => ({
				name: restaurant.menuData.name,
				menuGroups: groupByPriceCategory(getMenu(restaurant) || []),
				...getLunchHours(restaurant),
			}))
			// Filter out restaurants that have an empty menu
			.filter(
				(restaurant) =>
					restaurant.menuGroups &&
					Object.values(restaurant.menuGroups).flat().length > 0
			)
			// Only include restaurants that are currently open, opening soon
			// Include restaurants that don't have properly resolving opening hours in case there actually is a menu available for that day
			.filter(
				(restaurant) =>
					!restaurant.openingHour ||
					!restaurant.closingHour ||
					isWithinInterval(getNow(), {
						start: addMinutes(restaurant.openingHour, -210),
						end: restaurant.closingHour,
					})
			)
	);
};

export const revalidateRestaurants = async () => {
	'use server';
	revalidateTag(fetchTag);
};
