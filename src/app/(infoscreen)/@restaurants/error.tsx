'use client';

import { Slide } from '@/components/Carousel';

const EventsError = () => {
	return (
		<Slide className="bg-green-unari pb-0">
			<div className="flex min-h-full min-w-full flex-col items-center justify-center  gap-y-16">
				<h2 className="mb-4 text-4xl font-bold">Lunch</h2>
				<p className="text-2xl font-bold text-red-800">
					Error loading restaurants
				</p>
			</div>
		</Slide>
	);
};

export default EventsError;
