import Image from 'next/image';
import { Slide } from './Carousel';

const LofiGirl = () => (
	<Slide>
		<div className="relative size-full">
			<Image
				unoptimized
				fill
				className="object-cover"
				src={'/lofihiphop.gif'}
				alt={'Lo-Fi Girl'}
			/>
		</div>
	</Slide>
);

export default LofiGirl;
