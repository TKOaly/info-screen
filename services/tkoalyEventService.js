import axios from "axios";
import { isAfter, addMinutes } from "date-fns";
import * as R from "ramda";
import { compareAsc } from "date-fns";

const ENTRYPOINT = "https://event-api.tko-aly.fi/api/events";

const sortEvents = R.sort((a, b) => compareAsc(new Date(a.starts), new Date(b.starts)));

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
