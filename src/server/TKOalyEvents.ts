'use server';

import { customLocale, type mappedRelativeDateToken } from '@/lib/eventUtils';
import {
	addMinutes,
	compareAsc,
	formatRelative,
	isAfter,
	startOfToday,
} from 'date-fns';
import { revalidateTag } from 'next/cache';
import { GET } from './wrappers';

const ENTRYPOINT = 'https://event-api.tko-aly.fi/api/events';

export type TKOalyEvent = {
	id: string;
	name: string;
	price: string;
	starts: string;
	registration_starts: string;
	registration_ends: string;
	organizer: {
		name: string;
		url: string;
	};
	location: string;
	category: string;
	deleted: number;
};

/* Organizers that have appeared in the data
type organizers =
	| 'Matlu'
	| 'Matlu ry'
	| 'Limes ry'
	| 'HYY'
	| 'Tietotekniikan opiskelijoiden liitto ry TiTOL'
	| 'Skripti ry'
	| 'TKT-alumni ry'
	| 'Prodeko'
	| 'Opiskelijat'
	| 'Kimmon ystävät ry x Matlu'
	| 'Integralis'
	| 'Hanken BBall'
	| 'Vapaateekkarit'
	| 'Limes, Matlu, Kannunvalajat, Biosfääri, Condus & TYT'
	| 'Euroopan parlamentin Suomi-toimisto'
	| 'Tietojenkäsittelytieteen kandiohjelma'
	| 'Tiedekunta // Faculty';
*/

const fetchTag = 'tko_aly_events';

const getUpcomingEvents = async () =>
	await GET<TKOalyEvent[]>(
		`${ENTRYPOINT}?fromDate=${encodeURIComponent(startOfToday().toJSON())}`,
		{
			next: {
				tags: [fetchTag],
				revalidate: 300,
			},
		}
	).then((events) =>
		events
			.filter(
				({ deleted, name, starts }) =>
					!deleted &&
					!name.includes('TEMPLATE') &&
					isAfter(new Date(starts), new Date())
			)
			.sort((a, b) =>
				compareAsc(
					new Date(a.starts),
					addMinutes(new Date(b.starts), 5)
				)
			)
	);

const separateWeeklyAndMeetings = (events: TKOalyEvent[]) => {
	const Weekly: TKOalyEvent[] = [];
	const rest = events.filter((event) => {
		// TODO: Have this not be manual. The best solution would be for the backend to support weekly events natively.
		if (
			/weekly|chess club\b|shakkikerho\b|liikuntavuoro\b/i.test(
				event.name
			)
		) {
			if (
				!Weekly.some(
					(e) =>
						e.name.toLowerCase().slice(0, 16).trim() ===
						event.name.toLowerCase().slice(0, 16).trim()
				)
			) {
				Weekly.push(event);
			}
			return false;
		}
		/* Separate meetings to it own category (unused)
			if (/kokous\b|meeting\b/i.test(event.name)) {
				if (
					/syys|kevät|statutory|sääntömääräinen|ylimääräinen/i.test(
						event.name
					) ||
					!Meetings.some(
						(e) =>
							!/syys|kevät|statutory|sääntömääräinen|ylimääräinen/i.test(
								e.name
							)
					)
				) {
					Meetings.push(event);
				}
				return false;
			}
		*/
		return true;
	});

	const result = {
		Weekly,
		rest,
	};

	return result;
};

export const getTKOalyEvents = async () => {
	'use server';
	return await getUpcomingEvents()
		.then(separateWeeklyAndMeetings)
		.then(({ Weekly, rest }) => ({
			'Viikottaiset // Weekly': Weekly,
			...Object.groupBy(
				rest,
				(a: TKOalyEvent) =>
					formatRelative(new Date(a.starts), new Date(), {
						locale: customLocale,
						weekStartsOn: 1,
					}) as mappedRelativeDateToken
			),
		}));
};

const selectOnlyKJYR = (events: TKOalyEvent[]) => {
	const KJYREvents = events.filter((event) => /^KJYR\b/.test(event.name));
	if(KJYREvents.length > 0)
		return KJYREvents[0].starts;
	return null;
}

export const getKJYRDate = async () => {
	'use server';
	return await getUpcomingEvents().then(selectOnlyKJYR)
};

export const revalidateTKOalyEvents = async () => {
	'use server';
	revalidateTag(fetchTag);
};
