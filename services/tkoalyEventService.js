import request from 'request-promise'

const requestHeaders = {
  'X-Token': process.env.TKOALY_EVENT_MS_TOKEN
}

const ENTRYPOINT = 'https://members.tko-aly.fi/api/events'

const getFromDateString = () => {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export const fetchUpcomingEvents = () =>
  request
    .get(`${ENTRYPOINT}?fromDate=${getFromDateString()}`, {headers: requestHeaders})
    .then(JSON.parse)
    .then(events => events.filter(({deleted, name, starts}) => !deleted && !name.includes('TEMPLATE') && new Date(starts).getTime() > Date.now()))
