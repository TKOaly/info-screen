'use client';

import { Slide } from '@/components/Carousel';

const TjError = () => {
	return (
		<Slide className="bg-grey-500">
			<div className="flex min-h-full min-w-full flex-col items-center gap-y-4">
				<h3 className="text-2xl font-bold">Error loading tj</h3>
			</div>
		</Slide>
	);
};

export default TjError;
