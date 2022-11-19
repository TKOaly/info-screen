import axios from "axios";
import { isAfter, addMinutes, compareAsc } from 'date-fns'
import * as R from 'ramda';

const ENTRYPOINT = "https://ilotalo.matlu.fi/api/events/";
const ORGANIZATION = "TKO-äly";

const sortEvents = R.sort((a, b) => compareAsc(new Date(a.starts), new Date(b.starts)));

export const fetchUpcomingEvents = () =>
  axios
    .get(ENTRYPOINT)
    .then(res => res.data)
    .then(data => data.map(event => ({...event, starts: new Date(event.starts * 1000)})))
    .then(events =>
      events.filter(
        ({ starts, organization }) =>
          organization === ORGANIZATION &&
          isAfter(new Date(starts), addMinutes(new Date(), -15))
      )
    )
    .then(sortEvents)
    .catch(err => {
      console.error("Retrieving ilotao events failed:", err);
      return [];
    });

export const fetchGroupedEvents = () =>
    fetchUpcomingEvents()