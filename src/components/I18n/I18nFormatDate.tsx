'use client';

import { useLang } from '@/lib/lang';
import { format } from 'date-fns';
import { enGB, fi } from 'date-fns/locale';

// Changes between Finnish and English on an interval
// Children is shape of "Finnish // English"
// If no // is found, the string is returned as is
const I18nFormatDate = ({
	date,
	format: dateFormat,
	options = {},
}: {
	date: Date;
	format: string;
	options?: {
		locale?: Locale;
		weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
		firstWeekContainsDate?: number;
		useAdditionalWeekYearTokens?: boolean;
		useAdditionalDayOfYearTokens?: boolean;
	};
}) => {
	const lang = useLang();

	return format(date, dateFormat, {
		...options,
		locale: lang ? enGB : fi,
	});
};

export default I18nFormatDate;
