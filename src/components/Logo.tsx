import React from 'react';

const Logo = ({
	width = 400,
	height = 400,
	autoPlay = true,
	...rest
}: Partial<React.HTMLProps<HTMLVideoElement>>) => {
	return (
		<video
			src="/logo.webm"
			width={width}
			height={height}
			loop={autoPlay}
			autoPlay={autoPlay}
			{...rest}
		></video>
	);
};

export default Logo;
