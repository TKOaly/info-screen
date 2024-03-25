import { isSameWeek } from 'date-fns';
import { enGB } from 'date-fns/locale';

// This is a custom locale for separating events into the desired groups
type relativeDateToken = 'today' | 'tomorrow' | 'nextWeek' | 'other';
export type mappedRelativeDateToken =
	| "'Tällä viikolla // This week'"
	| "'Ensi viikolla // Next week'"
	| "'Myöhemmin // Later'";

export const customLocale = {
	...enGB,
	formatRelative: function (
		// We are only grouping future events
		formatRelativeToken: relativeDateToken,
		date: Date,
		baseDate: Date
	): mappedRelativeDateToken {
		if (
			formatRelativeToken === 'tomorrow' &&
			!isSameWeek(date, baseDate, { weekStartsOn: 1 })
		)
			return "'Ensi viikolla // Next week'";

		if (
			formatRelativeToken === 'nextWeek' &&
			isSameWeek(date, baseDate, { weekStartsOn: 1 })
		)
			return "'Tällä viikolla // This week'";

		const relativeTokens: Record<
			relativeDateToken,
			mappedRelativeDateToken
		> = {
			today: "'Tällä viikolla // This week'",
			tomorrow: "'Tällä viikolla // This week'",
			nextWeek: "'Ensi viikolla // Next week'",
			other: "'Myöhemmin // Later'",
		};
		return relativeTokens[formatRelativeToken];
	},
};
