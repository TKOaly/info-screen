import { Slide } from '@/components/Carousel';

const Panini = async () => {
	return (
		<Slide className="bg-white">
			<iframe
				className="size-full border-0"
				src="https://panini.tko-aly.fi/info-screen"
				title="Panini info screen"
				allowFullScreen
			/>
		</Slide>
	);
};

export default Panini;
