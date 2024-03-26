import { Slide } from '@/components/Carousel';

const TransitLoading = async () => {
	return (
		<Slide className="bg-blue-hsl">
			<div className="flex min-h-full min-w-full flex-col items-center gap-y-4">
				<h1 className="text-4xl">Loading Public Transit...</h1>
			</div>
		</Slide>
	);
};

export default TransitLoading;
