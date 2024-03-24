'use client';

import { useLang } from '@/lib/lang';

// Changes between Finnish and English on an interval
// Children is shape of "Finnish // English"
// If no // is found, the string is returned as is
const I18n = ({ children }: { children: string }) => {
	const lang = useLang();

	const string = children.includes('//')
		? children
				.split('//')
				[lang].replace(/(?<= |\/|^)\/(?= |\/|&)/, '')
				.trim()
		: children;

	return string || children;
};

export default I18n;
