'use server';
import { createClient, type NetworkError } from 'graphql-http';
import { revalidateTag } from 'next/cache';

const ENDPOINT = 'https://api.digitransit.fi/routing/v2/hsl/gtfs/v1';
const fetchTag = 'hsl-transit';

const client = createClient({
	url: ENDPOINT,
	headers: {
		'digitransit-subscription-key': process.env.DIGITRANSIT_TOKEN,
	},
	shouldRetry: async (err: NetworkError, retries: number) => {
		if (retries > 3) {
			// max 3 retries and then report service down
			return false;
		}

		// try again when service unavailable, could be temporary
		if ([502, 503, 504].some(err.response?.status)) {
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

export const getTransitData = async () => {
	'use server';
	let result;
	console.log('Fetching transit data');
	return await new Promise((resolve, reject) => {
		let result;
		client.subscribe(
			{
				query: `
{
 stops(ids: ["HSL:1240134", "HSL:1240133", "HSL:1240118", "HSL:1240103", "HSL:1240419", "HSL:1240418", "HSL:1230109", "HSL:1230112"]) {
 gtfsId
    name
    code
    stoptimesWithoutPatterns {
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
				next: (data) => (result = data),
				error: (err) => reject,
				complete: () => resolve(result),
			}
		);
	});
};
export const revalidateTransit = async () => revalidateTag(fetchTag);
