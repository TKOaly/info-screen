import { Carousel, type SlideElement } from '@/components/Carousel';
import { isWithinInterval } from 'date-fns';

type CarouselLayoutProps = Record<string, SlideElement>;

const CarouselLayout = ({
	events,
	tj,
	sponsors,
	restaurants,
	transit,
	ad,
	lectures,
	ilotalo,
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
				{restaurants}
				{events}
				{tj}
				{ilotalo}
				{transit}
				{children}
			</Carousel>
		</main>
	);
};

export default CarouselLayout;
