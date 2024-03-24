'use server';

import {
	addHours,
	addMinutes,
	format,
	isWithinInterval,
	parse,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import en from 'date-fns/locale/en-US';
import { revalidateTag } from 'next/cache';
import { groupBy } from 'ramda';
import { GET } from './wrappers';

type Restaurants =
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

type FoodData = RestaurantData['menuData']['menus'][number]['data'][number];

const mapFood = ({ name, price, meta }: FoodData) => {
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

// Testing offest in hours
const testingOffset = 24;

const groupByPriceCategory = groupBy(
	({ category }: ReturnType<typeof mapFood>) => category.toLowerCase()
);

function mapRestaurant(restaurant: RestaurantData) {
	const { menuData } = restaurant;

	const now =
		process.env.NODE_ENV === 'development'
			? addHours(new Date(), testingOffset)
			: new Date();

	// Find a menu for today
	const menu = menuData.menus.find(
		({ date }) => date === format(now, 'EEE dd.MM.', { locale: en })
	)?.data;

	if (!menu || menu.length === 0) return undefined;

	// Get opening and closing hours
	const lunchHours = menuData.visitingHours.lounas.items?.[0].hours;
	const [openingHour = undefined, closingHour = undefined] = lunchHours
		.split('–')
		.map((hour) => {
			const date = parse(hour, 'HH:mm', now);
			return zonedTimeToUtc(date, 'Europe/Helsinki').toISOString();
		});

	// Group the menu by price category
	const menuGroups = groupByPriceCategory(menu.map(mapFood));

	// openingHour and closingHour are in UTC (Z)
	return {
		name: menuData.name,
		menuGroups,
		lunchHours,
		openingHour,
		closingHour,
	};
}

export type Restaurant = NonNullable<ReturnType<typeof mapRestaurant>>;

const BASE_URL = 'https://unicafe.fi/wp-json/swiss/v1/restaurants/?lang=en';

const fetchTag = 'restaurants';

export const getRestaurants = async (restaurants: Restaurants[]) => {
	const allRestaurants = await GET<RestaurantData[]>(BASE_URL, {
		next: {
			tags: [fetchTag],
			revalidate: 3600,
		},
	});

	const menus = {} as Record<Restaurants, Restaurant>;

	restaurants.forEach((restaurantName) => {
		// Find the matching restaurant
		const restaurantData = allRestaurants.find(({ title }) =>
			title.includes(restaurantName)
		);
		if (!restaurantData) return;

		// Map the restaurant data to a usable format and get opening and closing hours
		const restaurant = mapRestaurant(restaurantData);

		if (!restaurant) return;

		// Only include the restaurant if it is open
		if (
			!restaurant.openingHour ||
			!restaurant.closingHour ||
			isWithinInterval(
				process.env.NODE_ENV === 'development'
					? addHours(new Date(), testingOffset)
					: new Date(),
				{
					start: addMinutes(new Date(restaurant.openingHour), -210),
					end: new Date(restaurant.closingHour),
				}
			)
		) {
			menus[restaurantName] = restaurant;
			return;
		}
	});

	return menus;
};

export const revalidateRestaurants = async () => {
	'use server';
	revalidateTag(fetchTag);
};
