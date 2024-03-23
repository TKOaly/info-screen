'use client';

import { Restaurant, revalidateRestaurants } from '@/server/restaurants';
import { differenceInMilliseconds } from 'date-fns';
import { useEffect } from 'react';

const CloseRestaurants = ({ restaurants }: { restaurants: Restaurant[] }) => {
	useEffect(() => {
		const timeouts = restaurants
			.filter(
				(
					restaurant
				): restaurant is Restaurant & { closingHour: string } =>
					restaurant.closingHour !== undefined
			)
			.map(({ closingHour }) =>
				setTimeout(
					async () => {
						await revalidateRestaurants();
					},
					differenceInMilliseconds(
						new Date(closingHour),
						new Date()
					) + 10000
				)
			);

		return () => timeouts.forEach((timeout) => clearTimeout(timeout));
	}, [restaurants]);

	return null;
};

export default CloseRestaurants;
