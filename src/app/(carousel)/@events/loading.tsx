import { Slide } from '@/components/Carousel';

const EventsLoading = () => {
	return (
		<Slide half className="bg-grey-800 pb-0">
			<div className="flex min-h-full min-w-full flex-col items-center gap-y-4">
				<h2 className="mb-4 text-4xl font-bold">Events</h2>
				<h3 className="text-2xl font-bold">{'Events Loading'}</h3>
			</div>
		</Slide>
	);
};

export default EventsLoading;
