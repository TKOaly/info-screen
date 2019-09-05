import { fetchUpcomingEvents } from "../services/tkoalyEventService";

export const getEvents = (_, res) => {
  fetchUpcomingEvents()
    .then(events => res.json(events))
    .catch(({ response: { status, data } }) =>
      res.status(status || 500).json(data || { error: "Internal server error" })
    );
};
