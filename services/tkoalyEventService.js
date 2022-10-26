import axios from "axios";
import {
  isAfter,
  addMinutes,
  isSameWeek,
  startOfToday,
  formatRelative,
  compareAsc
} from "date-fns";
import * as R from "ramda";
import { enGB } from "date-fns/locale";

const ENTRYPOINT = "https://event-api.tko-aly.fi/api/events";

const formatRelativeLocale = {
  today: "'Today', EEEE dd.MM.",
  tomorrow: "'Tomorrow', EEEE dd.MM.",
  nextWeek: function(date, baseDate) {
    if (isSameWeek(date, baseDate)) {
      return "'This week'";
    } else {
      return "'Next week'";
    }
  },
  other: "'Later'"
};

export const customLocale = {
  ...enGB,
  formatRelative: function(token, date, baseDate, options) {
    let format = formatRelativeLocale[token];
    if (typeof format === "function") {
      return format(date, baseDate, options);
    }
    return format;
  }
};

const sortEvents = R.sort((a, b) =>
  compareAsc(new Date(a.starts), new Date(b.starts))
);
const groupEvents = R.groupBy(a =>
  formatRelative(new Date(a.starts), new Date(), {
    locale: customLocale,
    weekStartsOn: 1
  })
);

export const fetchUpcomingEvents = () =>
  axios
    .get(ENTRYPOINT, {
      // Get events that are happening today and in the future
      params: { fromDate: startOfToday().toJSON() }
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

export const fetchGroupedEvents = () => fetchUpcomingEvents().then(groupEvents);
