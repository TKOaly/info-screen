'use client';

import { langAtom } from '@/lib/lang';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export const LanguageInterval = () => {
	const [lang, setlang] = useAtom(langAtom);

	useEffect(() => {
		// Interval for switching language in event titles etc.
		const langInterval = setInterval(
			() => setlang(lang === 0 ? 1 : 0),
			10 * 1000
		);

		return () => {
			clearInterval(langInterval);
		};
	}, [lang, setlang]);

	return null;
};
