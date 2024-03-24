import { isSameWeek } from 'date-fns';
import { enGB } from 'date-fns/locale';

// This is a custom locale for separating events into the desired groups
type relativeDateToken = 'today' | 'tomorrow' | 'nextWeek' | 'other';
export type mappedRelativeDateToken = "'This week'" | "'Next week'" | "'Later'";

export const customLocale = {
	...enGB,
	formatRelative: function (
		// We are only grouping future events
		formatRelativeToken: relativeDateToken,
		date: Date,
		baseDate: Date
	) {
		if (
			formatRelativeToken === 'tomorrow' &&
			!isSameWeek(date, baseDate, { weekStartsOn: 1 })
		)
			return "'Next week'";

		if (
			formatRelativeToken === 'nextWeek' &&
			isSameWeek(date, baseDate, { weekStartsOn: 1 })
		)
			return "'This week'";

		const relativeTokens: Record<
			relativeDateToken,
			mappedRelativeDateToken
		> = {
			today: "'This week'",
			tomorrow: "'This week'",
			nextWeek: "'Next week'",
			other: "'Later'",
		};
		return relativeTokens[formatRelativeToken];
	},
};
