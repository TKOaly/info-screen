'use client';

import { useEffect, useState } from 'react';

const EventName = ({ children }: { children: string }) => {
	const [lang, setLang] = useState(1);

	useEffect(() => {
		const nextLang = () => {
			setLang((lang + 1) % 2);
		};
		const langInterval = setInterval(nextLang, 10000);
		return () => clearInterval(langInterval);
	}, [lang]);

	const displayName = children.includes('//')
		? children
				.split('//')
				[lang].replace(/(?<!\d)\/(?!\d)/, '')
				.trim()
		: children;

	return (
		<p className="text-wrap text-xl font-semibold">
			{displayName || children}
		</p>
	);
};

export default EventName;
