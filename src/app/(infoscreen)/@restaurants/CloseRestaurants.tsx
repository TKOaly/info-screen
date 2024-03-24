'use client';

import { Restaurant, revalidateRestaurants } from '@/server/restaurants';
import { differenceInMilliseconds } from 'date-fns';
import { useEffect } from 'react';

const CloseRestaurants = ({ restaurants }: { restaurants: Restaurant[] }) => {
	// Set a timeout to revalidate restaurants every time one of them closes
	useEffect(() => {
		const timeouts = restaurants
			.filter(
				(
					restaurant
				): restaurant is Restaurant & { closingHour: Date } =>
					restaurant.closingHour !== undefined
			)
			.map(({ closingHour }) => {
				// Prevent a revalidation call loop in case the server returns a restaurant that is already closed
				// This should not happen but just in case, also enables testing past days in development
				// The Unicafe times/dates can't be trusted as they seem to be written manually
				if (differenceInMilliseconds(closingHour, new Date()) < 0)
					return;

				return setTimeout(
					async () => {
						await revalidateRestaurants();
					},
					differenceInMilliseconds(closingHour, new Date()) + 10000
				);
			});

		return () => timeouts.forEach((timeout) => clearTimeout(timeout));
	}, [restaurants]);

	return null;
};

export default CloseRestaurants;
