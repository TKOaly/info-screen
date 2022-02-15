import { fetchUpcomingEvents } from "../../../services/tkoalyEventService";

export default function handle(req, res) {
  fetchUpcomingEvents()
    .then(events => res.json(events))
    .catch(() => {
      res.status(500).json({ error: "Internal server error" });
    });
}
