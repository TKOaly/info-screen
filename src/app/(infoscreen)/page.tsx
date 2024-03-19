import { Slide } from '@/components/Carousel';
import Logo from '@/components/Logo';

const TKOalyLogo = async () => {
	// Carousel located in main layout to allow slides as parallel paths
	return (
		<Slide
			half
			className="items-center justify-center bg-black text-yellow-400"
		>
			<Logo />
		</Slide>
	);
};

export default TKOalyLogo;
