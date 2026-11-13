'use client';

import { doLangCycleAtom, langAtom } from '@/lib/lang';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export const LanguageInterval = () => {
	const [lang, setlang] = useAtom(langAtom);
	const [doLangCycle] = useAtom(doLangCycleAtom);

	useEffect(() => {
		// Interval for switching language in event titles etc.
		const langInterval = setInterval(
			() => { if (doLangCycle) setlang(lang === 0 ? 1 : 0) },
			10 * 1000
		);

		return () => {
			clearInterval(langInterval);
		};
	}, [doLangCycle, lang, setlang]);

	return null;
};
