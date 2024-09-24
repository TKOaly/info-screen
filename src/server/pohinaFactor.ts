'use server';

import { max } from 'date-fns';
import { revalidateTag } from 'next/cache';
import { GET } from './wrappers';

const ENTRYPOINT =
	'https://klusteri.network/api/events/latest?sensors=[%22klusteri/ac/reed-1%22,%22klusteri/ac/reed-2%22]';

type SensorData = {
	sensors: Record<
		number,
		{
			id: number;
			name: string;
			created_at: string;
			updated_at: string;
		}
	>;
	events: Record<
		number,
		{
			id: string;
			sensor_id: number;
			type: string;
			timestamp: string;
		}
	>;
	pohinaFactor: number;
};

const fetchTag = 'pohinaFactor';

export const getPohinaFactor = async () =>
	await GET<SensorData>(ENTRYPOINT, {
		next: {
			tags: [fetchTag],
			revalidate: 5 * 60,
		},
	}).then(({ events, pohinaFactor }) => ({
		lastActivity: max(
			Object.values(events).map((event) => new Date(event.timestamp))
		),
		pohinaFactor,
	}));

export const revalidatePohinaFactor = async () => revalidateTag(fetchTag);
