import { fetchUpcomingEvents } from "../../../services/tkoalyEventService";
import { fetchUpcomingEvents as fetchPajaEvents } from "../../../services/toskaPajaCalendarService"; // eslint-disable-line
import { compareAsc } from "date-fns";
import * as R from "ramda";
import { enableCoronaInfo } from "../../config.json";

export default function handle(req, res) {
  if (enableCoronaInfo) {
    res.json([]);
    return;
  }
  Promise.all([fetchUpcomingEvents(), fetchPajaEvents()])
    .then(([tkoalyEvents, pajaEvents]) => {
      return R.pipe(
        R.concat(pajaEvents),
        R.sort((a, b) => compareAsc(new Date(a.starts), new Date(b.starts)))
      )(tkoalyEvents);
    })
    .then(events => res.json(events))
    .catch(asd => {
      res.status(500).json({ error: "Internal server error" });
    });
}
