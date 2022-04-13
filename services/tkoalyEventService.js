import axios from "axios";
import { isAfter, addMinutes, isSameWeek } from "date-fns";
import * as R from "ramda";
import { compareAsc } from "date-fns";
import { formatRelative, isSameUTCWeek } from "date-fns";
import { fi } from "date-fns/locale";

const ENTRYPOINT = "https://event-api.tko-aly.fi/api/events";

const formatRelativeLocale = {
  today: "'Today'",
  tomorrow: "'Tomorrow'",
  nextWeek: function (date, baseDate) {
    if (isSameWeek(date, baseDate)) {
      return "'This week'"
    } else {
      return "'Next week'"
    }
  },
  other: "'Later'",
};

export const customLocale = {
  ...fi,
  formatRelative: function(token, date, baseDate, options) {
    let format = formatRelativeLocale[token]
    if (typeof format === 'function') {
      return format(date, baseDate, options)
    }
    return format
  }
};

const sortEvents = R.sort((a, b) => compareAsc(new Date(a.starts), new Date(b.starts)));
const groupEvents = R.groupBy((a) => formatRelative(new Date(a.starts), new Date(), { locale: customLocale, weekStartsOn: 1 }));

export const fetchUpcomingEvents = () =>
  axios
    .get(ENTRYPOINT, {
      params: { fromDate: new Date().toJSON() }
    })
    .then(res => res.data)
    .then(events =>
      events.filter(
        ({ deleted, name, starts }) =>
          !deleted &&
          !name.includes("TEMPLATE") &&
          isAfter(new Date(starts), addMinutes(new Date(), -15))
      )
    )
    .then(sortEvents)
    .catch(err => {
      console.error("Retrieving tkoaly events failed:", err);
      return [];
    });

export const fetchGroupedEvents = () =>
    fetchUpcomingEvents().then(groupEvents)