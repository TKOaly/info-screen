'use client';

import { Slide } from '@/components/Carousel';
import Image from 'next/image';

const EventsError = () => {
	return (
		<Slide className="bg-org-matlu-primary pb-0">
			<div className="flex min-h-full min-w-full flex-col items-center justify-center gap-y-12">
				<p className="font-serif text-4xl font-bold text-black">
					bmur klust<span className="text-red-700">error</span>kole.
				</p>
				<Image
					src="/triangle.gif"
					width={300}
					height={300}
					alt="triangle man"
				/>
			</div>
		</Slide>
	);
};

export default EventsError;
