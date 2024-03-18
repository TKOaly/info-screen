import { EventLine } from '@/components/Events/EventLine';
import { getGroupedEvents } from '@/server/events';
import { Fragment } from 'react';

const Events = async () => {
	const events = await getGroupedEvents();

	return (
		<div className="flex h-full min-h-0 flex-col items-center justify-start gap-y-4">
			<h2 className="text-4xl font-bold">Events</h2>
			<div className="scrollbar-none flex min-h-0 overflow-y-auto">
				<div className="flex min-h-0 flex-col gap-y-4">
					{events &&
						Object.entries(events).map(([relativeWeek, events]) => (
							<Fragment key={relativeWeek}>
								<h3 className="text-2xl font-bold">
									{relativeWeek}
								</h3>
								<hr className="w-full" />
								{events.map((event) => (
									<EventLine key={event.id} event={event} />
								))}
							</Fragment>
						))}
				</div>
			</div>
		</div>
	);
};

export default Events;
