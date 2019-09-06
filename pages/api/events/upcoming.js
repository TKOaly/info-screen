import { fetchUpcomingEvents } from "../../../services/tkoalyEventService";

export default function handle(req, res) {
    fetchUpcomingEvents()
    .then(events => res.json(events))
    .catch(({ response: { status, data } }) =>
      res.status(status || 500).json(data || { error: "Internal server error" })
    );
}
  