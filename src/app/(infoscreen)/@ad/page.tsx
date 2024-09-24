import { Slide } from '@/components/Carousel';
import Image from 'next/image';

const Ad = async () => {
	return (
		<Slide>
			<div className="relative size-full">
				<Image
					fill
					className="object-cover"
					src={'/atkytp.png'}
					alt={'Ad picture'}
				/>
			</div>
		</Slide>
	);
};

export default Ad;
