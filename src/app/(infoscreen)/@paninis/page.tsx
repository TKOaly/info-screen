import { Slide } from '@/components/Carousel';

const Paninis = async () => {
	return (
		<Slide className="bg-white pb-0">
			<iframe
				className="h-full"
				src="https://panini.tko-aly.fi/"
			></iframe>
		</Slide>
	);
};

export default Paninis;
