'use client';

import { Slide } from '@/components/Carousel';

const AirqualityError = () => {
	return (
		<Slide fullWidth className="bg-black">
			<div className="flex size-full items-center justify-center p-8 text-center">
				<h1 className="text-4xl font-semibold">
					Error loading air quality dashboard
				</h1>
			</div>
		</Slide>
	);
};

export default AirqualityError;
