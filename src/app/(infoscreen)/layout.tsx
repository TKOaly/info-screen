import { Carousel, Slide, SlideElement } from '@/components/Carousel';
import Logo from '@/components/Logo';

type CarouselLayoutProps = {
	events: SlideElement;
	restaurants: SlideElement;
	transit: SlideElement; // TODO
	ilotalo: SlideElement;
	children: SlideElement;
};

const CarouselLayout = ({
	events,
	restaurants,
	ilotalo,
	children,
}: CarouselLayoutProps) => {
	return (
		<main className="flex max-h-screen min-h-screen">
			<Carousel loop duration={60} delay={10000}>
				{events}
				<Slide className="items-center justify-center bg-black text-yellow-400">
					<Logo />
				</Slide>
				{restaurants}
				{/* transit */}
				{ilotalo}
				{children}
			</Carousel>
		</main>
	);
};

export default CarouselLayout;
