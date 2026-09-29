import { Carousel } from '@/components/Carousel';
import { isWithinInterval } from 'date-fns';
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
	voting: ReactNode;
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
	voting,
}: CarouselLayoutProps) => {
	// Check if today's date is between the 15th and 24th of October
	const today = new Date();
	const isVotingVisible = isWithinInterval(today, {
		start: new Date(today.getFullYear(), 9, 13), // October is month 9 (0-indexed)
		end: new Date(today.getFullYear(), 9, 24),
	});

	return (
		<main className="flex max-h-screen min-h-screen">
			<Carousel loop duration={40} delay={20000}>
				{ad}
				{sponsors}
				{lectures}
				{isVotingVisible ? voting : <></>}
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
