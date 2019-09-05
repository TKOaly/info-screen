import axios from "axios";

const requestHeaders = {
  "X-Token": process.env.TKOALY_EVENT_MS_TOKEN
};

const ENTRYPOINT = "https://members.tko-aly.fi/api/events";

const getFromDateString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

export const fetchUpcomingEvents = () =>
  axios
    .get(ENTRYPOINT, {
      headers: requestHeaders,
      params: { fromDate: getFromDateString() }
    })
    .then(res => res.data)
    .then(events =>
      events.filter(
        ({ deleted, name, starts }) =>
          !deleted &&
          !name.includes("TEMPLATE") &&
          new Date(starts).getTime() > Date.now()
      )
    );
