import React, { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import {
	differenceInMilliseconds,
	isAfter,
	isValid,
	isWithinInterval,
	min,
	parse,
} from 'date-fns';
import RestaurantCarousel from './Restaurant/RestaurantCarousel';
import LofiGirl from './LofiGirl';

// FIXME: Refactor

const fetcher = (url) => fetch(url).then((res) => res.json());
const swrOptions = {
	refreshInterval: 60 * 60 * 1000, // 1 hour
};
const hasValues = (obj) => obj && Object.entries(obj).length > 0;
// Hardcoded value for when to start showing food lists every day
const OPENING_HOUR = '08:00';

const isRestaurantOpen = (restaurant) => {
	if (!restaurant.lunchHours || !restaurant.closingHour) {
		// Assume it is open if we cannot parse lunch hours
		return true;
	}

	const now = new Date();

	return isWithinInterval(now, {
		// If the restaurant opens before the opening hour (unlikely if it's set to 8am),
		// this prevents an invalid interval.
		start: min(
			[
				new Date(restaurant.openingHour),
				parse(OPENING_HOUR, 'HH:mm', now),
			].filter(isValid)
		),
		end: new Date(restaurant.closingHour),
	});
};

export default function FoodList() {
	// TODO: Reduce code duplication
	const chemicum = useSWR('/api/foodlists/chemicum', fetcher, swrOptions);
	const exactum = useSWR('/api/foodlists/exactum', fetcher, swrOptions);
	const kaivopiha = useSWR('/api/foodlists/kaivopiha', fetcher, swrOptions);
	const requests = [chemicum, exactum, kaivopiha];

	const restaurants = requests.map((request) => request.data);

	const restaurantsWithData = restaurants.filter(
		(restaurant) =>
			restaurant && (hasValues(restaurant.groups) || restaurant.error)
	);
	console.log('======UPDATE=======');

	const [showAll, setShowAll] = useState(false);
	const restaurantsToShow = useMemo(() => {
		if (showAll) return restaurantsWithData;
		return restaurantsWithData.filter(isRestaurantOpen);
	}, [showAll, restaurants]);

	// This gets updated when the useEffect below rerenders the component after a restaurant closes,
	// causing the useEffect below to fire and set a timeout for the next closing if there is one.
	const nextClosingHour = useMemo(() => {
		return min(
			restaurantsToShow
				.map(({ closingHour }) => new Date(closingHour))
				.filter(isValid)
		);
	}, [restaurantsToShow]);

	// FIXME: The useEffects below are a mess and the whole logic of this component should be rethought.

	const now = new Date();
	const [ticked, update] = useState(0);
	// Rerender when the next restaurant closes
	useEffect(() => {
		if (!isValid(nextClosingHour)) return;

		const timeout = setTimeout(
			() => update((n) => n + 1),
			differenceInMilliseconds(nextClosingHour, now) + 100
		);
		return () => clearTimeout(timeout);
	}, [nextClosingHour, update]);

	// Rerender when we reach the opening hour
	// It should be enough to do this once per restaurant update
	// FIXME: This is fundamentally broken, but it works. Causes multiple updates when we hit OPENING_HOUR, but will contain itself to a reasonable amount. Hopefully.
	useEffect(() => {
		const openingHour = parse(OPENING_HOUR, 'HH:mm', now);
		if (isAfter(now, openingHour)) return;

		const timeout = setTimeout(
			() => update((n) => n + 1),
			differenceInMilliseconds(openingHour, now) - 100
		);
		return () => clearTimeout(timeout);
	}, [ticked, update]);

	return (
		<div>
			{restaurantsToShow.length > 0 ? (
				<RestaurantCarousel
					restaurants={restaurantsToShow}
					onClickItem={() => setShowAll((current) => !current)}
				/>
			) : (
				<LofiGirl onClick={() => setShowAll(true)} />
			)}
		</div>
	);
}
