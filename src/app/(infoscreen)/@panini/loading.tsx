import { Slide } from '@/components/Carousel';

const PaniniLoading = async () => {
	return (
		<Slide className="bg-white text-black">
			<div className="flex size-full items-center justify-center">
				<h1 className="text-4xl">Loading Panini...</h1>
			</div>
		</Slide>
	);
};

export default PaniniLoading;
