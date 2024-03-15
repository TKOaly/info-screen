import Image from 'next/image';
import React from 'react';

const LofiGirl = (props) => (
	<div className="relative flex" {...props}>
		<Image
			src={'/lofihiphop.gif'}
			fill
			className="object-contain z-20"
			unoptimized
			alt={'Lo-Fi Girl'}
		/>
	</div>
);

export default LofiGirl;
