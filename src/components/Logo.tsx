import React, { Suspense } from 'react';

const Logo = ({
	width = 400,
	height = 400,
	autoPlay = true,
	...rest
}: Partial<React.HTMLProps<HTMLVideoElement>>) => {
	return (
		<Suspense fallback={null}>
			<video
				src="/logo.webm"
				width={width}
				height={height}
				loop={autoPlay}
				autoPlay={autoPlay}
				muted
				{...rest}
			></video>
		</Suspense>
	);
};

export default Logo;
