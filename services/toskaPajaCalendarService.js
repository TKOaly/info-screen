import axios from "axios";
import * as R from "ramda";
import { isWithinInterval, isSameDay, isBefore } from "date-fns";

const ENTRYPOINT = "https://study.cs.helsinki.fi/pajat/api/calendar";

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

const addName = pajaEvent =>
  R.assoc("name", `Paja: ${pajaEvent.courseNames.join(", ")}`, pajaEvent);

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
  R.map(addName)
);

export const fetchUpcomingEvents = () =>
  axios
    .get(ENTRYPOINT)
    .then(res => res.data)
    .then(formatToEvents)
    .then(events =>
      events.filter(
        ({ starts, ends }) =>
          isWithinInterval(new Date(), { start: starts, end: ends }) ||
          (isSameDay(starts, new Date()) && isBefore(new Date(), starts))
      )
    );
