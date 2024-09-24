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
			() => void revalidateTKOalyEvents(),
			5 * 60 * 1000
		);
		const ilotaloEventsInterval = setInterval(
			() => void revalidateIlotaloEvents(),
			15 * 60 * 1000
		);
		const pohinaFactorInterval = setInterval(
			() => void revalidatePohinaFactor(),
			5 * 60 * 1000
		);
		const restaurantsInterval = setInterval(
			() => void revalidateRestaurants(),
			60 * 60 * 1000
		);
		const lecturesInterval = setInterval(
			() => void revalidateLectures(),
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
