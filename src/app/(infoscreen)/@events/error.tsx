'use client';

import { Slide } from '@/components/Carousel';
import Image from 'next/image';

const EventsError = () => {
	return (
		<Slide className="bg-grey-800 pb-0">
			<div className="flex min-h-full min-w-full flex-col items-center justify-center gap-y-12">
				<h2 className="mb-4 text-4xl font-bold">Events</h2>
				<Image
					src="/triangle.gif"
					width={300}
					height={300}
					alt="triangle man"
				/>
				<p className="text-2xl font-bold text-red-600">
					Error loading events
				</p>
			</div>
		</Slide>
	);
};

export default EventsError;
