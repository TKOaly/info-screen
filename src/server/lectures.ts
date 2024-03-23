'use server';

import { customLocale } from '@/lib/eventUtils';
import {
	addHours,
	addMinutes,
	compareAsc,
	formatRelative,
	isWithinInterval,
} from 'date-fns';
import ical from 'ical';
import { revalidateTag } from 'next/cache';
import { groupBy } from 'ramda';

const ENTRYPOINTS = [
	'https://optime.helsinki.fi/icalservice/Department/920', // TKT & BSCS
	'https://optime.helsinki.fi/icalservice/Department/916', // MAT
	'https://optime.helsinki.fi/icalservice/Department/931', // CSM
	'https://optime.helsinki.fi/icalservice/Department/932', // DATA, MATR, MAST & LSI
];
// const ENTRYPOINT = 'https://future.optime.helsinki.fi/icalservice/Department/920'; // next year's reservations

export type Lecture = {
	uid: string;
	start: Date;
	summary: string;
	location: string | undefined;
	program: string | undefined;
};

const groupLectures = groupBy((a: Lecture) =>
	formatRelative(a.start, new Date(), {
		locale: customLocale,
		weekStartsOn: 1,
	})
);

const fetchTag = 'lecture_reservations';

export const getLectureReservations = async () => {
	'use server';

	const lectures = await Promise.all(
		ENTRYPOINTS.map(async (ENTRYPOINT) => {
			const data = await fetch(ENTRYPOINT, {
				next: {
					tags: [fetchTag],
					revalidate: 3600,
				},
			}).then((res) => res.text());
			return Object.values(ical.parseICS(data));
		})
	).then((res) => res.flat());

	const filtered = lectures
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
				lecture.uid !== undefined &&
				lecture.location !== undefined &&
				lecture.location.length > 0
		)
		.filter(({ start }) =>
			isWithinInterval(start, {
				start: addMinutes(new Date(), -30),
				end: addHours(new Date(), 72),
			})
		)
		.filter(({ summary }) => !/seminar|seminaari/i.test(summary))
		.sort((a, b) => compareAsc(a.start, addMinutes(b.start, 5)))
		.map(({ uid, start, summary, location, description }) => ({
			uid: uid,
			start: start,
			summary: summary.replace(/\(.*\)/, '').trim(),
			location,
			program:
				description // Match TKT, BSCS, MAT, CSM, DATA, MATR, MAST, LSI
					?.match(/^.*\n/)?.[0]
					?.match(/[A-Z]{3,4}(?=\d+\))/)?.[0] || undefined,
		}));

	return groupLectures(filtered);
};

export const revalidateLectures = async () => {
	'use server';
	revalidateTag(fetchTag);
};
