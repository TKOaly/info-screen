import axios from "axios";
import * as R from "ramda";
import { isWithinInterval, isSameDay, isBefore } from "date-fns";

const CALENDAR_ENTRYPOINT = "https://study.cs.helsinki.fi/pajat/api/calendar";
const CLASSROOM_ENTRYPOINT = "https://study.cs.helsinki.fi/pajat/api/luokka";

const flattenWeeks = R.flatten();
const convertStringDateToDate = dateString => {
  const [day, month, year] = R.map(Number, dateString.split("."));
  return new Date(year, month - 1, day, 0);
};
const convertTimesToPairs = R.map(R.over(R.lensProp("times"), R.toPairs));

const handleTime = date => ([time, courses]) => {
  if (R.isEmpty(courses) || courses[0] === "") {
    return [];
  }
  const startDate = new Date(date.valueOf());
  const endDate = new Date(date.valueOf());
  const [startHour, endHour] = R.map(Number, time.split("-"));
  startDate.setHours(startHour);
  endDate.setHours(endHour);
  return R.map(
    courseName => ({
      courseName,
      startDate,
      endDate
    }),
    courses
  );
};

const pickTimes = R.map(R.prop("times"));

const convertTimePairsToEvents = day => {
  const date = R.prop("date", day);
  const timesLens = R.lensProp("times");
  return R.over(timesLens, R.map(handleTime(date)), day);
};

const groupByDates = R.groupBy(event => "" + event.startDate + event.endDate);
const summarizeDates = R.map(event => {
  const [{ startDate, endDate }] = event;
  const courseNames = R.map(R.prop("courseName"), event);
  return {
    starts: startDate,
    ends: endDate,
    courseNames
  };
});

const addName = pajaEvent => {
  const courses = pajaEvent.courseNames.map(({ short }) => short);
  return R.assoc("name", `Paja: ${courses.join(", ")}`, pajaEvent);
};

const mergeSimilarEvents = R.reduce((array, event) => {
  if (R.isEmpty(array)) {
    return [event];
  }
  const previousEvent = R.last(array);
  const eventNamesAreEqual = event.name === previousEvent.name;
  const eventsAreBackToBack =
    event.starts.valueOf() === previousEvent.ends.valueOf();
  if (eventNamesAreEqual && eventsAreBackToBack) {
    return [
      ...R.dropLast(1, array),
      R.assoc("ends", new Date(event.ends.valueOf()), previousEvent)
    ];
  } else {
    return [...array, event];
  }
}, []);

const formatToEvents = R.pipe(
  flattenWeeks,
  R.map(day => R.assoc("date", convertStringDateToDate(day.date), day)),
  convertTimesToPairs,
  R.map(convertTimePairsToEvents),
  pickTimes,
  R.flatten,
  groupByDates,
  summarizeDates,
  R.values,
  R.map(addName),
  mergeSimilarEvents
);

const fetchCalendar = () =>
  axios
    .get(CALENDAR_ENTRYPOINT)
    .then(res => res.data)
    .then(formatToEvents)
    .then(events =>
      events.filter(
        ({ starts, ends }) =>
          isWithinInterval(new Date(), { start: starts, end: ends }) ||
          (isSameDay(starts, new Date()) && isBefore(new Date(), starts))
      )
    )
    .catch(err => {
      console.error("Retrieving toska events failed:", err);
      return [];
    });

const fetchClassRoomInformation = () =>
  axios
    .get(CLASSROOM_ENTRYPOINT)
    .then(res => res.data)
    .catch(err => {
      console.error("Retrieving toska class room failed:", err);
      return "";
    });

const addClassRoomToEventNames = ([calendar, classRoom]) =>
  R.map(
    event => R.assoc("name", event.name + ` (${classRoom})`, event),
    calendar
  );

export const fetchUpcomingEvents = () =>
  Promise.all([fetchCalendar(), fetchClassRoomInformation()]).then(
    addClassRoomToEventNames
  );
