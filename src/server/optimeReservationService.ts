'use server';

import ical from 'ical';

const ENTRYPOINTS = [
	'https://future.optime.helsinki.fi/icalservice/Department/920',
];

export const fetchUpcomingReservations = () =>
	Promise.all(
		ENTRYPOINTS.map(async (url) => {
			const result = await fetch(url);
			const data = await result.json();
			return ical.parseICS(data);
		})
	).then((calendars) => calendars.flat());
