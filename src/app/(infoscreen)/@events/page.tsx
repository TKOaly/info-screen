import { Slide } from '@/components/Carousel';
import { EventLine } from '@/components/Events/EventLine';
import { getGroupedEvents } from '@/server/events';
import { Fragment } from 'react';

const Events = async () => {
	const events = await getGroupedEvents();

	return (
		<Slide className="bg-grey-900 p-0 pt-3">
			<div className="flex size-full min-h-0 flex-col items-center justify-start gap-y-4">
				<h2 className="z-50 h-16 rounded-xl bg-grey-900 px-2 text-4xl font-bold">
					Events
				</h2>
				<div className="scrollbar-none -mt-16 flex min-h-0 w-full overflow-y-auto">
					<div className="flex min-h-0 w-full flex-col pt-6">
						{events &&
							Object.entries(events).map(
								([relativeWeek, events]) => (
									<Fragment key={relativeWeek}>
										<h3 className="p-2 text-2xl font-bold">
											{relativeWeek}
										</h3>
										<hr className="w-full" />
										{events.map((event, idx) => (
											<EventLine
												key={event.id}
												event={event}
												idx={idx}
											/>
										))}
									</Fragment>
								)
							)}
					</div>
				</div>
			</div>
		</Slide>
	);
};

export default Events;
