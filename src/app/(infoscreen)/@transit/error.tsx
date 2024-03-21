'use client';

import { Slide } from '@/components/Carousel';
import { BusFront } from 'lucide-react';

const EventsError = () => {
	return (
		<Slide className="bg-blue-hsl pb-0 font-m_plus_rounded">
			<div className="flex min-h-full min-w-full flex-col items-center gap-y-4">
				<div className="flex items-center gap-x-4 bg-sky-700 p-4 pb-0">
					<BusFront width={64} height={64} strokeWidth={1.5} />
					<div className="h-full w-[10px] border-x-[3px]"></div>
					<h2 className="text-4xl font-bold leading-8 tracking-tight">
						HSL
						<br />
						<span className="font-normal">HRT</span>
					</h2>
				</div>
				<h3 className="text-2xl font-bold">
					{'Error fetching public transit'}
				</h3>
			</div>
		</Slide>
	);
};

export default EventsError;
