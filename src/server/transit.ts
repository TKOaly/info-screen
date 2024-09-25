import { revalidateTag } from 'next/cache';
import { GET } from './wrappers';

type GTFSRTData = {
	header: {
		gtfsRealtimeVersion: string;
		incrementality: string;
		timestamp: string;
	};
	entity: Entity[];
};

type Entity = {
	id: string;
	tripUpdate: TripUpdate;
};

type TripUpdate = {
	trip: Trip;
	stopTimeUpdate?: StopTimeUpdate[];
	timestamp: string;
};

type Trip = {
	startTime: string;
	startDate: string;
	scheduleRelationship?: string;
	routeId: string;
	directionId: number;
};

type StopTimeUpdate = {
	arrival?: Arrival;
	departure?: Departure;
	stopId: string;
	scheduleRelationship: string;
};

type Arrival = {
	time: string;
	uncertainty?: number;
};

type Departure = {
	time: string;
	uncertainty?: number;
};

const GTFS_URL = 'https://realtime.hsl.fi/realtime/trip-updates/v2/hsl';
const GTFS_RT_URL = 'https://infopalvelut.storage.hsldev.com/gtfs/hsl.zip';

const fetchTag = 'gtfs_realtime';

export const getTransit = async (): Promise<unknown> => {
	const gtfsRT = await GET<GTFSRTData>(GTFS_RT_URL, {
		next: {
			tags: [fetchTag],
			revalidate: 3600,
		},
	});

	const gtfs = await GET<unknown>(GTFS_URL, {
		next: {
			tags: ['gtfs_static'],
			revalidate: 12 * 3600,
		},
	});
};

export const revalidateTransit = async () => {
	'use server';
	revalidateTag(fetchTag);
};
