import Image from 'next/image';
import { ComponentProps } from 'react';

const LofiGirl = ({
	objectFit = 'cover',
}: Pick<ComponentProps<typeof Image>, 'objectFit'>) => (
	<div className="relative size-full">
		<Image
			unoptimized
			fill
			objectFit={objectFit}
			src={'/lofihiphop.gif'}
			alt={'Lo-Fi Girl'}
		/>
	</div>
);

export default LofiGirl;
