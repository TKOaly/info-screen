'use server';

import { mappedRelativeDateToken } from '@/lib/eventUtils';
import {
	addHours,
	addMinutes,
	compareAsc,
	formatRelative,
	isSameDay,
	isSameWeek,
	isWithinInterval,
} from 'date-fns';
import { enGB } from 'date-fns/locale';
import ical from 'ical';
import { revalidateTag } from 'next/cache';
import { groupBy } from 'ramda';

const ENTRYPOINTS = [
	'https://optime.helsinki.fi/icalservice/Department/920', // TKT & BSCS
	'https://optime.helsinki.fi/icalservice/Department/931', // CSM
	'https://optime.helsinki.fi/icalservice/Department/932', // DATA, MATR, MAST & LSI
	'https://optime.helsinki.fi/icalservice/Department/916', // MAT
];
// const ENTRYPOINT = 'https://future.optime.helsinki.fi/icalservice/Department/920'; // next year's reservations

export type Lecture = {
	uid: string;
	start: Date;
	summary: string;
	location: string | undefined;
	program: string | undefined;
};

// This is a custom locale for separating events into the desired groups
type relativeDateToken = 'today' | 'tomorrow' | 'nextWeek' | 'other';
type mappedRelativeLectureDateToken =
	| "'Tänään // Today'"
	| "'Huomenna // Tomorrow'"
	| mappedRelativeDateToken;

const customLocale = {
	...enGB,
	formatRelative: function (
		// We are only grouping future events
		formatRelativeToken: relativeDateToken,
		date: Date,
		baseDate: Date
	): mappedRelativeLectureDateToken {
		if (
			formatRelativeToken === 'nextWeek' &&
			isSameWeek(date, baseDate, { weekStartsOn: 1 })
		)
			return "'Tällä viikolla // This week'";

		const relativeTokens: Record<
			relativeDateToken,
			mappedRelativeLectureDateToken
		> = {
			today: "'Tänään // Today'",
			tomorrow: "'Huomenna // Tomorrow'",
			nextWeek: "'Ensi viikolla // Next week'",
			other: "'Myöhemmin // Later'",
		};
		return relativeTokens[formatRelativeToken];
	},
};

const groupLectures = groupBy((a: Lecture) =>
	formatRelative(a.start, new Date(), {
		locale: customLocale,
		weekStartsOn: 1,
	})
);

const fetchTag = 'lecture_reservations';

const programsOrder = [
	'TKT',
	'BSCS',
	'CSM',
	'DATA',
	'MAT',
	'MAST',
	'MATR',
	'LSI',
];

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
				uid: string;
				start: Date;
				summary: string;
				location: string;
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
				// Next three days so that on friday you can see monday's lectures
				start: addMinutes(new Date(), -30),
				end: addHours(new Date(), 72),
			})
		)
		.filter(({ summary }) => !/seminar|seminaari/i.test(summary)) // Filter out seminars
		.map(({ uid, start, summary, location, description }) => ({
			uid,
			start,
			summary: summary.replace(/\(.*\)/, '').trim(),
			location,
			program:
				description // Match TKT, BSCS, MAT, CSM, DATA, MATR, MAST, LSI
					?.match(/^.*\n/)?.[0]
					?.match(/[A-Z]{3,4}(?=\d+\))/)?.[0] || undefined,
		}))
		.sort(
			(a, b) =>
				// Sort first by day, then program (TKT and BSCS first etc.) and then start time
				(isSameDay(a.start, b.start)
					? 0
					: compareAsc(a.start, addMinutes(b.start, 1))) ||
				programsOrder.indexOf(a.program || programsOrder[0]) -
					programsOrder.indexOf(
						b.program || programsOrder.slice(-1)[0]
					) ||
				compareAsc(a.start, addMinutes(b.start, 1))
		);

	return groupLectures(filtered);
};

export const revalidateLectures = async () => {
	'use server';
	revalidateTag(fetchTag);
};
