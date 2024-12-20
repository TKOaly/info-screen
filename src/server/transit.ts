'use server';
import { createClient, type NetworkError } from 'graphql-http';
import { revalidateTag } from 'next/cache';

const ENDPOINT = 'https://api.digitransit.fi/routing/v2/hsl/gtfs/v1';
const fetchTag = 'hsl-transit';

const client = createClient({
	url: ENDPOINT,
	headers: {
		'digitransit-subscription-key': process.env.DIGITRANSIT_TOKEN ?? "",
	},
	shouldRetry: async (err: NetworkError, retries: number) => {
		if (retries > 3) {
			// max 3 retries and then report service down
			return false;
		}

		// try again when service unavailable, could be temporary
		if (err.response?.status != undefined && [502, 503, 504].includes(err.response.status)) {
			// wait one second (you can alternatively time the promise resolution to your preference)
			await new Promise((resolve) => setTimeout(resolve, 1000));
			return true;
		}

		// otherwise report error immediately
		return false;
	},
	fetchFn: (res: string, opt?: RequestInit) => {
		return fetch(res, {
			next: {
				tags: [fetchTag],
				revalidate: 5,
			},
			...opt,
		});
	},
});

export type TransitData = {
	stops: {
		gtfsId: string
		name: string
		code: string
		stoptimesWithoutPatterns: {
			arrivalDelay: number
			departureDelay: number
			headsign: string
			realtime: boolean
			realtimeArrival: number
			realtimeDeparture: number
			realtimeState: string
			serviceDay: number
			scheduledArrival: number
			scheduledDeparture: number
			trip: {
				tripHeadsign: string
				route: {
					type: number
				}
				routeShortName: string
			}
		}[]
	}[]
}

export const getTransitData = async (stops: string[]): Promise<TransitData> => {
	'use server';
	return await new Promise((resolve, reject) => {
		let result: TransitData | null | undefined;
		client.subscribe<TransitData>(
			{
				query: `
{
 stops(ids: [${stops.map(x => `"${x}"`).join(',')} ]) {
 gtfsId
    name
    code
    stoptimesWithoutPatterns(numberOfDepartures: 20) {
      arrivalDelay
      departureDelay
      headsign
      realtime
      realtimeArrival
      realtimeDeparture
      realtimeState
      serviceDay
      scheduledArrival
      scheduledDeparture
    trip {
	tripHeadsign
    route {
    type
    }
        routeShortName
      }
    }
  }
}
        `,
			},
			{
				next: (data) => (result = data.data),
				error: reject,
				complete: () => {
					if(result)
						resolve(result)
					else
						reject(new Error("received undefined result from transit API"))
				},
			}
		);
	});
};
export const revalidateTransit = async () => revalidateTag(fetchTag);
