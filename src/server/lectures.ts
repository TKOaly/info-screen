'use server';

import { customLocale } from '@/lib/eventUtils';
import { addMinutes, compareAsc, formatRelative, isAfter } from 'date-fns';
import ical from 'ical';
import { revalidateTag } from 'next/cache';
import { groupBy } from 'ramda';

const ENTRYPOINT = 'https://optime.helsinki.fi/icalservice/Department/920';
// const ENTRYPOINT = 'https://future.optime.helsinki.fi/icalservice/Department/920'; // next year's reservations

export type Lecture = {
	uid: string;
	start: Date;
	summary: string;
	location: string | undefined;
};

const groupEvents = groupBy((a: Lecture) =>
	formatRelative(a.start, new Date(), {
		locale: customLocale,
		weekStartsOn: 1,
	})
);

const fetchTag = 'lecture_reservations';

export const getLectureReservations = async () => {
	'use server';

	const data = await fetch(ENTRYPOINT, {
		next: {
			tags: [fetchTag],
			revalidate: 3600,
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

export const revalidateLectures = async () => {
	'use server';
	revalidateTag(fetchTag);
};
