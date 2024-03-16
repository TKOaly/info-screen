import { List } from '@mui/material';
import React from 'react';
import useSWR from 'swr';
import Event from './Event/Event';

const fetcher = (url) => fetch(url).then((res) => res.json());

const EventList = () => {
	const { data: events, error } = useSWR('/api/events/upcoming', fetcher, {
		refreshInterval: 5 * 60 * 1000, // 5 minutes
	});

	return (
		<List dense={true}>
			{error && (
				<h3 className="text-lg font-bold opacity-50 text-red-500 mb-4">
					Failed to load events, this list may be out of date.
				</h3>
			)}
			{events &&
				Object.entries(events).map(([subtitle, events]) => (
					<React.Fragment key={subtitle}>
						<h3 className="text-2xl font-bold">{subtitle}</h3>
						{events.map((event) => (
							<Event key={event.id} event={event} />
						))}
						<hr />
					</React.Fragment>
				))}
		</List>
	);
};

export default EventList;
