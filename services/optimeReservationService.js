import axios from "axios";
import ical from "ical";

const ENTRYPOINTS = [
  "https://future.optime.helsinki.fi/icalservice/Department/920"
];

const handleCalendars = calendars => calendars.flat();

export const fetchUpcomingReservations = () =>
  Promise.all(
    ENTRYPOINTS.map(url =>
      axios
        .get(url)
        .then(res => res.data)
        .then(data => ical.parseICS(data))
    )
  ).then(handleCalendars);
