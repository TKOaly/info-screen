import { Carousel } from '@/components/Carousel';
import { type ReactNode } from 'react';

type CarouselLayoutProps = {
	events: ReactNode;
	sponsors: ReactNode;
	restaurants: ReactNode;
	transit: ReactNode;
	airquality: ReactNode;
	panini: ReactNode;
	tjcounter: ReactNode;
	template: ReactNode;
	ad: ReactNode;
	lectures: ReactNode;
	children: ReactNode;
};

const CarouselLayout = ({
	events,
	sponsors,
	restaurants,
	transit,
	airquality,
	panini,
	tjcounter,
	ad,
	lectures,
	children,
}: CarouselLayoutProps) => {

	return (
		<main className="flex max-h-screen min-h-screen">
			<Carousel loop duration={40} delay={20000}>
				{ad}
				{sponsors}
				{lectures}
				{panini}
				{restaurants}
				{events}
				{tjcounter}
				{transit}
				{airquality}
				{children}
			</Carousel>
		</main>
	);
};

export default CarouselLayout;
