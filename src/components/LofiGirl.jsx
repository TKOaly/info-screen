import Image from 'next/image';
import React from 'react';

const LofiGirl = (props) => (
	<div
		style={{
			position: 'relative',
			display: 'flex',
		}}
		{...props}
	>
		<Image
			src={'/lofihiphop.gif'}
			fill
			style={{
				objectFit: 'contain',
				zIndex: 20,
			}}
			unoptimized
			alt={'Lo-Fi Girl'}
		/>
	</div>
);

export default LofiGirl;
