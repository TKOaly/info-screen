'use client';

import { revalidateTKOalyEvents } from '@/server/TKOalyEvents';
import { revalidateIlotaloEvents } from '@/server/ilotaloEvents';
import { revalidateLectures } from '@/server/lectures';
import { revalidatePohinaFactor } from '@/server/pohinaFactor';
import { revalidateRestaurants } from '@/server/restaurants';
import { useEffect } from 'react';

export const RefetchIntervals = () => {
	useEffect(() => {
		// Intervals for revalidating slide data
		const TKOalyEventsInterval = setInterval(
			async () => await revalidateTKOalyEvents(),
			5 * 60 * 1000
		);
		const ilotaloEventsInterval = setInterval(
			async () => await revalidateIlotaloEvents(),
			15 * 60 * 1000
		);
		const pohinaFactorInterval = setInterval(
			async () => await revalidatePohinaFactor(),
			5 * 60 * 1000
		);
		const restaurantsInterval = setInterval(
			async () => await revalidateRestaurants(),
			60 * 60 * 1000
		);
		const lecturesInterval = setInterval(
			async () => await revalidateLectures(),
			60 * 60 * 1000
		);

		return () => {
			clearInterval(TKOalyEventsInterval);
			clearInterval(ilotaloEventsInterval);
			clearInterval(pohinaFactorInterval);
			clearInterval(restaurantsInterval);
			clearInterval(lecturesInterval);
		};
	}, []);

	return null;
};
