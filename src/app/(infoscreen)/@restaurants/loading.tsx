import { Slide } from '@/components/Carousel';

const RestaurantsLoading = async () => {
	return (
		<Slide className="bg-green-unari">
			<div className="flex min-h-full min-w-full flex-col items-center gap-y-4">
				<h1 className="text-4xl">Loading Unicafe restaurants...</h1>
			</div>
		</Slide>
	);
};

export default RestaurantsLoading;
