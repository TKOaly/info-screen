'use client';

import { revalidateTKOalyEvents } from '@/server/TKOalyEvents';
import { revalidateIlotaloEvents } from '@/server/ilotaloEvents';
import { revalidateLectures } from '@/server/lectures';
import { revalidateRestaurants } from '@/server/restaurants';
import { useEffect } from 'react';

const RefetchIntervals = () => {
	useEffect(() => {
		const TKOalyEventsInterval = setInterval(
			async () => await revalidateTKOalyEvents(),
			5 * 60 * 1000
		);
		const ilotaloEventsInterval = setInterval(
			async () => await revalidateIlotaloEvents(),
			15 * 60 * 1000
		);
		const restaurantsInterval = setInterval(
			async () => await revalidateRestaurants(),
			60 * 60 * 1000
		);
		const lecturesInterval = setInterval(
			async () => await revalidateLectures(),
			3 * 60 * 60 * 1000
		);

		return () => {
			clearInterval(TKOalyEventsInterval);
			clearInterval(ilotaloEventsInterval);
			clearInterval(restaurantsInterval);
			clearInterval(lecturesInterval);
		};
	}, []);

	return null;
};

export default RefetchIntervals;
