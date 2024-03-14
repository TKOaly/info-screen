import {
	isAfter,
	addMinutes,
	isSameWeek,
	startOfToday,
	formatRelative,
	compareAsc,
} from 'date-fns';
import * as R from 'ramda';
import { enGB } from 'date-fns/locale';

const ENTRYPOINT = 'https://event-api.tko-aly.fi/api/events';

const formatRelativeLocale = {
	today: "'This week'",
	tomorrow: "'This week'",
	nextWeek: function (date, baseDate) {
		if (isSameWeek(date, baseDate, { weekStartsOn: 1 })) {
			return "'This week'";
		} else {
			return "'Next week'";
		}
	},
	other: "'Later'",
};

export const customLocale = {
	...enGB,
	formatRelative: function (token, date, baseDate, options) {
		let format = formatRelativeLocale[token];
		if (typeof format === 'function') {
			return format(date, baseDate, options);
		}
		return format;
	},
};

const sortEvents = R.sort((a, b) =>
	compareAsc(new Date(a.starts), new Date(b.starts))
);
const groupEvents = R.groupBy((a) =>
	formatRelative(new Date(a.starts), new Date(), {
		locale: customLocale,
		weekStartsOn: 1,
	})
);

export const fetchUpcomingEvents = async () => {
	try {
		const result = await fetch(
			`${ENTRYPOINT}?fromDate=${encodeURIComponent(startOfToday().toJSON())}`
		);
		const events = await result.json();
		const filteredEvents = events.filter(
			({ deleted, name, starts }) =>
				!deleted &&
				!name.includes('TEMPLATE') &&
				isAfter(new Date(starts), addMinutes(new Date(), -15))
		);
		return sortEvents(filteredEvents);
	} catch (error) {
		console.error(`[fetchUpcomingEvents] ${error}`);
		return [];
	}
};

export const fetchGroupedEvents = () => fetchUpcomingEvents().then(groupEvents);
