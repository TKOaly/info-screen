'use client';

import { Slide } from '@/components/Carousel';

const TJCounterError = () => (
	<Slide className="items-center justify-center bg-teal-900 text-white">
		<h2 className="text-4xl font-black">Tänään Jäljellä</h2>
		<p className="mt-4 text-2xl font-bold text-red-300">
			Error loading counter
		</p>
	</Slide>
);

export default TJCounterError;
