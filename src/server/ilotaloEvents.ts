'use server';

import { addMinutes, addYears, compareAsc, formatRelative } from 'date-fns';

const ENTRYPOINT = 'https://ilotalo.matlu.fi/api/events/';

import { customLocale, mappedRelativeDateToken } from '@/lib/eventUtils';
import { revalidateTag } from 'next/cache';
import { groupBy, sort } from 'ramda';
import { GET } from './wrappers';

const mapEvents = (events: IlotaloEventData[]) =>
	events.map((event) => ({
		...event,
		starts: new Date(Number(event.starts) * 1000),
	}));

const sortEvents = sort((a: IlotaloEvent, b: IlotaloEvent) =>
	compareAsc(Number(a.starts), Number(b.starts))
);

const groupEvents = groupBy(
	(a: IlotaloEvent) =>
		formatRelative(a.starts, new Date(), {
			locale: customLocale,
			weekStartsOn: 1,
		}) as mappedRelativeDateToken
);

export type Room =
	| 'Kerhotila'
	| 'Kokoushuone'
	| 'Christina Regina'
	| 'Oleskelutila';

export type Organization =
	| 'Matrix'
	| 'Matlu'
	| 'HYK'
	| 'Resonanssi'
	| 'TKO-äly'
	| 'Limes'
	| 'MaO'
	| 'EGEA'
	| 'Helix'
	| 'MES'
	| 'Meridiaani'
	| 'Symbioosi'
	| 'Geysir'
	| 'Synop'
	| 'Vasara'
	| 'Moodi'
	| 'Kumpulan Speksi ry'
	| 'Spektrum rf'
	| 'Mesta'
	| 'Integralis'
	| 'Symbioosin kuoro';

type IlotaloEventData = {
	id: string;
	room: Room;
	name: string;
	description: string;
	isClosed: boolean;
	organization: Organization;
	starts: string;
};

export type IlotaloEvent = ReturnType<typeof mapEvents>[number];

const fetchTag = 'ilotalo_events';

export const getIlotaloEvents = async () => {
	'use server';

	return GET<IlotaloEventData[]>(ENTRYPOINT, {
		next: {
			tags: [fetchTag],
			revalidate: 900,
		},
	})
		.then((events) => {
			const now = addMinutes(new Date(), -60).valueOf() / 1000;
			const futureCutoff = addYears(new Date(), 1).valueOf() / 1000;
			return events
				.filter(
					({ starts }) => Number(starts) > now // Only future events
				)
				.filter(
					({ organization, room }) =>
						room !== 'Kokoushuone' || // No meetings
						// Unless organizer is one of these
						/tko-äly|matlu|limes/i.test(organization)
				)
				.filter(
					({ organization, name }) =>
						!/clean|siivous|siivoaa|laulanta/i.test(name) || // No cleaning or song book events
						'TKO-äly ry'.includes(organization) // Unless it's TKO-äly
				)
				.filter(
					({ name }) => !/kuoroharjoitukset/i.test(name) // Exclude weekly events and
				)
				.filter(
					({ starts }) => Number(starts) < futureCutoff // Remove meme/test events far in the future
				);
		})
		.then((events) => mapEvents(events))
		.then(sortEvents)
		.then(groupEvents);
};

export const revalidateIlotaloEvents = async () => {
	'use server';
	revalidateTag(fetchTag);
};
