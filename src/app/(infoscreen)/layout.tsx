import { Carousel, Slide, type SlideElement } from '@/components/Carousel';
import Logo from '@/components/Logo';

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
				<Slide className="items-center justify-center bg-black text-yellow-400">
					<Logo />
				</Slide>
				{/* transit */}
				{restaurants}
				{ad}
				{lectures}
				{ilotalo}
				{children}
			</Carousel>
		</main>
	);
};

export default CarouselLayout;
