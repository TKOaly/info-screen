import { fetchGroupedEvents } from "../../../services/tkoalyEventService";

export default async function handle(_req, res) {
  try {
    const events = await fetchGroupedEvents();
    return res.json(events);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}
