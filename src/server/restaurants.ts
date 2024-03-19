'use server';

import { format, parse } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import en from 'date-fns/locale/en-US';
import { groupBy } from 'ramda';
import { GET } from './wrappers';

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

const groupByPriceCategory = groupBy(({ category }: { category: string }) =>
	category.toLowerCase()
);

function formatRestaurant(restaurant: RestaurantData) {
	const { menuData } = restaurant;

	const foodlistData = menuData.menus.find(
		({ date }) => date === format(new Date(), 'EE dd.MM.', { locale: en })
	)?.data;

	if (!foodlistData) return undefined;

	const now = new Date();

	const lunchHours = menuData.visitingHours?.lounas?.items?.[0]?.hours;
	const [openingHour = null, closingHour = null] = lunchHours
		.split('–')
		.map((hour) => {
			const date = parse(hour, 'HH:mm', now);
			return zonedTimeToUtc(date, 'Europe/Helsinki').toISOString();
		});

	const groups = groupByPriceCategory(
		foodlistData?.map(({ name, price, meta }) => {
			return {
				name,
				category: price.name,
				price: price.value.student ?? price.value.student_hyy,
				meta: {
					diet: meta['0'],
					allergies: meta['1'],
					climateChoice:
						Array.isArray(meta['2']) &&
						meta['2'].includes('Ilmastovalinta'),
				},
			};
		})
	);

	// openingHour and closingHour are in UTC (Z)
	return {
		name: menuData.name,
		groups,
		lunchHours,
		openingHour,
		closingHour,
	};
}

export type Restaurant = NonNullable<ReturnType<typeof formatRestaurant>>;

const BASE_URL = 'https://unicafe.fi/wp-json/swiss/v1/restaurants/?lang=en';

type AvailableRestaurant = 'Kaivopiha' | 'Chemicum' | 'Exactum';

export const getRestaurants = async (restaurants: AvailableRestaurant[]) => {
	const allRestaurants = await GET<RestaurantData[]>(BASE_URL);

	const menus = {} as Record<
		AvailableRestaurant,
		ReturnType<typeof formatRestaurant>
	>;

	restaurants.forEach((restaurant) => {
		const restaurantData = allRestaurants.find(({ title }) =>
			title.includes(restaurant)
		);

		menus[restaurant] = restaurantData
			? formatRestaurant(restaurantData)
			: undefined;
	});

	return menus;
};
