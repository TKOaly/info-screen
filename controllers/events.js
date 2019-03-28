import { fetchUpcomingEvents } from '../services/tkoalyEventService'

export const getEvents = (_, res) => {
  fetchUpcomingEvents()
    .then(events => res.json(events))
}
