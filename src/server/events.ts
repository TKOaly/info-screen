'use server';

import {
	addMinutes,
	compareAsc,
	formatRelative,
	isAfter,
	isSameWeek,
	startOfToday,
} from 'date-fns';
import { enGB } from 'date-fns/locale';
import { groupBy } from 'ramda';
import { GET } from './wrappers';

const ENTRYPOINT = 'https://event-api.tko-aly.fi/api/events';

export type TKOalyEvent = {
	id: string;
	deleted: boolean;
	name: string;
	starts: string;
	registration_starts: string;
	registration_ends: string;
};

const getUpcomingEvents = async () => {
	const events = await GET<TKOalyEvent[]>(
		`${ENTRYPOINT}?fromDate=${encodeURIComponent(startOfToday().toJSON())}`,
		{
			next: {
				tags: ['events'],
				revalidate: 15 * 60,
			},
		}
	);
	return events
		.filter(
			({ deleted, name, starts }) =>
				!deleted &&
				!name.includes('TEMPLATE') &&
				isAfter(new Date(starts), new Date())
		)
		.sort((a, b) =>
			compareAsc(new Date(a.starts), addMinutes(new Date(b.starts), 5))
		);
};

// This is a custom locale for separating events into the desired groups
type relativeDateToken = 'today' | 'tomorrow' | 'nextWeek' | 'other';
type mappedRelativeDateToken = "'This week'" | "'Next week'" | "'Later'";
const customLocale = {
	...enGB,
	formatRelative: function (
		// We are only grouping future events
		formatRelativeToken: relativeDateToken,
		date: Date,
		baseDate: Date
	) {
		if (
			formatRelativeToken === 'tomorrow' &&
			!isSameWeek(date, baseDate, { weekStartsOn: 1 })
		)
			return "'Next week'";
		const relativeTokens: Record<
			relativeDateToken,
			mappedRelativeDateToken
		> = {
			today: "'This week'",
			tomorrow: "'This week'",
			nextWeek: "'Next week'",
			other: "'Later'",
		};
		return relativeTokens[formatRelativeToken];
	},
};

export const getGroupedEvents = async () => {
	'use server';
	return await getUpcomingEvents().then(
		groupBy(
			(a: TKOalyEvent) =>
				formatRelative(new Date(a.starts), new Date(), {
					locale: customLocale,
					weekStartsOn: 1,
				}) as mappedRelativeDateToken
		)
	);
};
