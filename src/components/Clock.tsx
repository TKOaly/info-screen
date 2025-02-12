'use client';

import { useEffect, useRef } from 'react';

const Clock = () => {
	const ref = useRef<HTMLParagraphElement>(null)
	useEffect(() => {
		const intervalId = setInterval(() => {
			if (ref.current != null)
				ref.current.textContent = new Date(Date.now())
					.toLocaleTimeString('fi-Fi')
					.replaceAll('.', ':');
		}, 1000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);
	return (
		<>
			<p ref={ref}>{new Date(Date.now())
				.toLocaleTimeString('fi-Fi')
				.replaceAll('.', ':')}</p>
		</>
	);
};

export default Clock;
