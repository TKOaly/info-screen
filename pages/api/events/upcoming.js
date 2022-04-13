import { fetchGroupedEvents } from "../../../services/tkoalyEventService";

export default function handle(req, res) {
  fetchGroupedEvents()
    .then(events => res.json(events))
    .catch((e) => {
      console.log(e)
      res.status(500).json({ error: "Internal server error" });
    });
}
