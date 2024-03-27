import { Carousel, SlideElement } from '@/components/Carousel';

type CarouselLayoutProps = {
	events: SlideElement;
	restaurants: SlideElement;
	transit: SlideElement; // TODO
	lectures: SlideElement;
	ilotalo: SlideElement;
	children: SlideElement;
};

const CarouselLayout = ({
	events,
	restaurants,
	lectures,
	ilotalo,
	children,
}: CarouselLayoutProps) => {
	return (
		<main className="flex max-h-screen min-h-screen">
			<Carousel loop duration={60} delay={20000}>
				{events}
				{/* <LofiGirl /> */}
				{restaurants}
				{/* transit */}
				{lectures}
				{ilotalo}
				{children}
			</Carousel>
		</main>
	);
};

export default CarouselLayout;
