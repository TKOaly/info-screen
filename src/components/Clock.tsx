'use client';

import { useEffect, useState } from 'react';

const Clock = () => {
	const [clock, setClock] = useState('00:00');
	useEffect(() => {
		const intervalId = setInterval(() => {
			setClock(
				new Date(Date.now())
					.toLocaleTimeString('fi-Fi')
					.replaceAll('.', ':')
			);
		}, 1000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);
	return (
		<>
			<p>{clock}</p>
		</>
	);
};

export default Clock;
