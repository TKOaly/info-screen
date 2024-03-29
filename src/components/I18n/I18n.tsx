'use client';

import { useLang } from '@/lib/lang';

// Changes between Finnish and English on an interval
// Children is shape of "Finnish // English"
// If no // is found, the string is returned as is
const I18n = ({ children }: { children: string | string[] }) => {
	const lang = useLang();

	const joined = Array.isArray(children) ? children.join('') : children;

	const string = joined.includes('//')
		? joined
				.split('//')
				[lang].replace(/(?<= |\/|^)\/(?= |\/|&)/, '')
				.trim()
		: joined;

	return string || children;
};

export default I18n;
