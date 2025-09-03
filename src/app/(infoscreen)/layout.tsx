import { Carousel, type SlideElement } from '@/components/Carousel';

type CarouselLayoutProps = Record<string, SlideElement>;

const CarouselLayout = ({
	events,
	sponsors,
	restaurants,
	transit,
	ad,
	lectures,
	ilotalo,
	children,
}: CarouselLayoutProps) => {
	return (
		<main className="flex max-h-screen min-h-screen">
			<Carousel loop duration={40} delay={20000}>
				{ad}
				{sponsors}
				{lectures}
				{restaurants}
				{events}
				{ilotalo}
				{transit}
				{children}
			</Carousel>
		</main>
	);
};

export default CarouselLayout;
