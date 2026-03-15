import { Slide } from '@/components/Carousel';

const TjLoading = async () => {
	return (
		<Slide className="bg-grey-500">
			<div className="flex min-h-full min-w-full flex-col items-center gap-y-4">
				<h1 className="text-4xl">Loading tj</h1>
			</div>
		</Slide>
	);
};

export default TjLoading;
