'use client';

import { Slide } from '@/components/Carousel';

const PaniniError = () => {
	return (
		<Slide className="bg-white text-black">
			<div className="flex size-full items-center justify-center p-8 text-center">
				<h1 className="text-4xl font-semibold">
					Error loading Panini info screen
				</h1>
			</div>
		</Slide>
	);
};

export default PaniniError;
