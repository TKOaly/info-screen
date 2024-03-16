import { Carousel, Slide } from '@/components/Carousel';
import Logo from '@/components/Logo';

const MainPage = () => {
	return (
		<main className="flex min-h-screen">
			<Carousel loop duration={30} delay={4000}>
				<Slide half className="bg-stone-800">
					Calendar
				</Slide>
				<Slide half className="bg-black justify-center items-center">
					<Logo />
				</Slide>
				<Slide full className="bg-green-800">
					Unicafe
				</Slide>
				<Slide half className="bg-sky-700">
					HSL
				</Slide>
			</Carousel>
		</main>
	);
};

export default MainPage;
