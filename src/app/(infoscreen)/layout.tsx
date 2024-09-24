import { Carousel, Slide, type SlideElement } from '@/components/Carousel';
import Logo from '@/components/Logo';

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
			<Carousel loop duration={40} delay={20000}>
				{events}
				<Slide className="items-center justify-center bg-black text-yellow-400">
					<Logo />
				</Slide>
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
