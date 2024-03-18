import { Carousel, Slide, SlideElement } from '@/components/Carousel';

type CarouselLayoutProps = {
	events: SlideElement;
	children: SlideElement; // TKO-äly logo
};

const CarouselLayout = ({ events, children }: CarouselLayoutProps) => {
	return (
		<main className="flex max-h-screen min-h-screen">
			<Carousel loop duration={50} delay={3000}>
				{events}
				{children}
				<Slide full className="bg-green-800">
					Unicafe
				</Slide>
				<Slide half className="bg-sky-700">
					HSL
				</Slide>
			</Carousel>
		</main>
	);
};

export default CarouselLayout;
