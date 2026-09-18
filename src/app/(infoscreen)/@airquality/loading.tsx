import { Slide } from '@/components/Carousel';

const AirqualityLoading = async () => {
	return (
		<Slide fullWidth className="bg-black">
			<div className="flex size-full items-center justify-center">
				<h1 className="text-4xl">Loading air quality...</h1>
			</div>
		</Slide>
	);
};

export default AirqualityLoading;
