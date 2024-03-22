import { EventLine } from '@/app/(infoscreen)/@events/EventLine';
import { Slide } from '@/components/Carousel';
import { getTKOalyEvents } from '@/server/TKOalyEvents';
import Image from 'next/image';
import { Fragment } from 'react';

const Events = async () => {
	const events = await getTKOalyEvents();

	return (
		<Slide className="bg-grey-900 pt-3">
			<div className="flex size-full min-h-0 flex-col items-center justify-start gap-y-4">
				<div className="relative -mt-4 max-h-0 w-full">
					<Image
						className="absolute right-4 top-6"
						src="/orgs/tekis.png"
						width={50}
						height={50}
						alt="TKO-äly logo"
					/>
				</div>
				<h2 className="z-50 rounded-xl bg-grey-900 px-2 text-4xl font-bold">
					Events
				</h2>
				<div className="scrollbar-none -mt-20 flex min-h-0 w-full overflow-y-auto">
					<div className="flex min-h-0 w-full flex-col pt-16">
						{events &&
							Object.entries(events).map(
								([relativeWeek, events]) => (
									<Fragment key={relativeWeek}>
										<h3 className="px-2 py-1 text-2xl font-bold text-org-tkoaly">
											{relativeWeek}
										</h3>
										<hr className="w-full text-org-tkoaly" />
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
