'use client';

import { Slide } from '@/components/Carousel';

const TemplateError = () => {
	return (
		<Slide className="bg-grey-800 font-serif">
			<div className="flex min-h-full min-w-full flex-col items-center justify-center gap-y-4">
				<h3 className="text-4xl font-bold">
					Error fetching lecture rooms
				</h3>
			</div>
		</Slide>
	);
};

export default TemplateError;
