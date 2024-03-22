'use server';

import { customLocale, mappedRelativeDateToken } from '@/lib/eventUtils';
import {
	addMinutes,
	compareAsc,
	formatRelative,
	isAfter,
	startOfToday,
} from 'date-fns';
import { groupBy } from 'ramda';
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

export const getTKOalyEvents = async () => {
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
