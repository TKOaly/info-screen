import { format, parse } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import en from 'date-fns/locale/en-US';
import { groupBy } from 'ramda';

const BASE_URL = 'https://unicafe.fi/wp-json/swiss/v1/restaurants/?lang=en';

const findByName = (data, name) =>
	data.find(({ title }) => title.includes(name));

export const fetchFoodlist = async (name) => {
	try {
		const res = await fetch(BASE_URL);
		const data = await res.json();
		const restaurant = findByName(data, name);
		return formatResponse(restaurant);
	} catch (error) {
		console.error(`[fetchFoodlist] ${error}`);
		return { error: error.message };
	}
};

export const fetchExactumFoodlist = () => fetchFoodlist('Exactum');
export const fetchChecmicumFoodlist = () => fetchFoodlist('Chemicum');
export const fetchKaivopihaFoodlist = () => fetchFoodlist('Kaivopiha');

const groupByPrice = groupBy(({ priceName }) => priceName.toLowerCase());

function formatResponse(response) {
	const { menuData } = response;

	const { data: foodlistData } = menuData.menus.find(
		({ date }) => date === format(new Date(), 'EE dd.MM.', { locale: en })
	);

	const now = new Date();
	const lunchHours = menuData.visitingHours?.lounas?.items?.[0]?.hours;
	const [openingHour = null, closingHour = null] = lunchHours
		.split('–')
		.map((hour) => parse(hour, 'HH:mm', now))
		.map((date) => zonedTimeToUtc(date, 'Europe/Helsinki'))
		.map((date) => date.toISOString());

	const groups = groupByPrice(
		foodlistData?.map(({ name, price, meta }) => {
			return {
				name: name,
				priceName: price.name,
				prices: price.value,
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
