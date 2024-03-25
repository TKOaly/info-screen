'use client';

import { langAtom } from '@/lib/lang';
import { revalidateTKOalyEvents } from '@/server/TKOalyEvents';
import { revalidateIlotaloEvents } from '@/server/ilotaloEvents';
import { revalidateLectures } from '@/server/lectures';
import { revalidatePohinaFactor } from '@/server/pohinaFactor';
import { revalidateRestaurants } from '@/server/restaurants';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const RefetchIntervals = () => {
	const [lang, setlang] = useAtom(langAtom);

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
			2 * 60 * 1000
		);
		const restaurantsInterval = setInterval(
			async () => await revalidateRestaurants(),
			60 * 60 * 1000
		);
		const lecturesInterval = setInterval(
			async () => await revalidateLectures(),
			60 * 60 * 1000
		);

		// Interval for switching language in event titles etc.
		const langInterval = setInterval(
			async () => setlang(((lang + 1) % 2) as 0 | 1),
			10 * 1000
		);

		return () => {
			clearInterval(TKOalyEventsInterval);
			clearInterval(ilotaloEventsInterval);
			clearInterval(pohinaFactorInterval);
			clearInterval(restaurantsInterval);
			clearInterval(lecturesInterval);
			clearInterval(langInterval);
		};
	}, [lang, setlang]);

	return null;
};

export default RefetchIntervals;
