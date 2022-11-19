import { fetchUpcomingEvents as fetchUpcomingTkoalyEvents, customLocale } from "./tkoalyEventService";
import { fetchUpcomingEvents as fetchUpcomingIlotaloEvents } from "./ilotaloEventService";
import { compareAsc, formatRelative, isDate } from "date-fns";
import * as R from 'ramda';

const sortEvents = R.sort((a, b) => compareAsc(a.starts, b.starts));
const groupEvents = R.groupBy((a) => formatRelative(a.starts, new Date(), { locale: customLocale, weekStartsOn: 1 }));

export const fetchGroupedEvents = () =>
    Promise.all([fetchUpcomingIlotaloEvents(), fetchUpcomingTkoalyEvents().then(data => data.map(event => ({ ...event, starts: new Date(event.starts)})))])
        .then(([ilotalo, tkoaly]) => [...ilotalo, ...tkoaly])
        .then(sortEvents)
        .then(groupEvents)