import { Carousel, type SlideElement } from '@/components/Carousel';

type CarouselLayoutProps = Record<string, SlideElement>;

const CarouselLayout = ({
	events,
	restaurants,
	ad,
	lectures,
	ilotalo,
	children,
}: CarouselLayoutProps) => {
	return (
		<main className="flex max-h-screen min-h-screen">
			<Carousel loop duration={40} delay={20000}>
				{events}
				{ad}
				{restaurants}
				{/*transit*/}
				{lectures}
				{ilotalo}
				{children}
			</Carousel>
		</main>
	);
};

export default CarouselLayout;
