import { Slide } from '@/components/Carousel';
import React from 'react';

const EventsLayout = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<Slide half className="bg-stone-800 pb-0">
			{children}
		</Slide>
	);
};

export default EventsLayout;
