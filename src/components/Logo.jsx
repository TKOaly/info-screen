import * as React from 'react';
import { useEffect, useState } from 'react';

const Logo = () => {
	// Render the logo only on the client-side
	// This avoids a Next hydration error due to the video tag
	const [canRenderClientSide, initialize] = useState(false);
	useEffect(() => {
		initialize(true);
	}, []);

	return (
		<div className="fixed bottom-2 right-2">
			{canRenderClientSide && (
				<video
					src="/logo.webm"
					width={200}
					height={200}
					loop
					autoPlay
				></video>
			)}
		</div>
	);
};

export default Logo;
