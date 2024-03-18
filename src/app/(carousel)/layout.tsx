import { Carousel, Slide, SlideElement } from '@/components/Carousel';

type CarouselLayoutProps = {
	events: SlideElement;
	restaurants: SlideElement;
	children: SlideElement;
};

const CarouselLayout = ({
	events,
	restaurants,
	children,
}: CarouselLayoutProps) => {
	return (
		<main className="flex max-h-screen min-h-screen">
			<Carousel loop duration={50} delay={3000}>
				{events}
				{children /* TKO-äly logo */}
				{restaurants}
				<Slide half className="bg-sky-700">
					HSL
				</Slide>
			</Carousel>
		</main>
	);
};

export default CarouselLayout;
