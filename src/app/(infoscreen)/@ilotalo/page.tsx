'use server';

import { Slide } from '@/components/Carousel';
import I18n from '@/components/I18n/I18n';
import { getIlotaloEvents } from '@/server/ilotaloEvents';
import Image from 'next/image';
import { Fragment } from 'react';
import { EventBox } from './EventBox';

const IlotaloEvents = async () => {
	const events = await getIlotaloEvents();

	return (
		<Slide className="bg-org-matlu-primary pt-3 text-grey-900">
			<div className="flex size-full min-h-0 flex-col items-center justify-start gap-y-4">
				<div className="relative -mt-4 max-h-0 w-full">
					<Image
						className="absolute right-4 top-6"
						src="/orgs/matlu.png"
						width={100}
						height={100}
						alt="matlu logo"
					/>
				</div>
				<h2 className="z-50 rounded-xl bg-org-matlu-primary px-2 text-4xl font-bold">
					Klusteri
				</h2>
				<div className="scrollbar-none -mt-20 flex min-h-0 w-full overflow-y-auto">
					<div className="flex min-h-0 w-full flex-col pt-14">
						{events &&
							Object.entries(events).map(
								([relativeWeek, events]) => (
									<Fragment key={relativeWeek}>
										<h3 className="p-2 text-2xl font-bold">
											<I18n>{relativeWeek}</I18n>
										</h3>
										<hr className="w-full" />
										<div className="grid grid-cols-3 gap-4 p-4">
											{events.map((event) => (
												<EventBox
													key={event.id}
													event={event}
												/>
											))}
										</div>
									</Fragment>
								)
							)}
					</div>
				</div>
			</div>
		</Slide>
	);
};

export default IlotaloEvents;
