'use server';

import { customLocale } from '@/lib/eventUtils';
import { addMinutes, compareAsc, formatRelative, isAfter } from 'date-fns';
import ical from 'ical';
import { groupBy } from 'ramda';

const ENTRYPOINT = 'https://optime.helsinki.fi/icalservice/Department/920';
// const ENTRYPOINT = 'https://future.optime.helsinki.fi/icalservice/Department/920'; // next year's reservations

const groupEvents = groupBy(
	(a: {
		uid: string;
		start: Date;
		summary: string;
		location: string | undefined;
	}) =>
		formatRelative(a.start, new Date(), {
			locale: customLocale,
			weekStartsOn: 1,
		})
);

export const getLectureReservations = async () => {
	'use server';

	const data = await fetch(ENTRYPOINT, {
		next: {
			tags: ['lectures'],
		},
	}).then((res) => res.text());

	const now = addMinutes(new Date(), -45);

	const lectures = Object.values(ical.parseICS(data))
		.filter(
			(
				lecture
			): lecture is ical.CalendarComponent & {
				start: Date;
				summary: string;
				uid: string;
			} =>
				lecture.type === 'VEVENT' &&
				lecture.start !== undefined &&
				lecture.start !== null &&
				lecture.summary !== undefined &&
				lecture.uid !== undefined
		)
		.filter(({ start }) => isAfter(start, now))
		.sort((a, b) => compareAsc(a.start, addMinutes(b.start, 5)))
		.map(({ uid, start, summary, location }) => ({
			uid: uid,
			start: start,
			summary: summary.replace(/\(.*\)/, '').trim(),
			location: location,
		}));

	return groupEvents(lectures);
};
