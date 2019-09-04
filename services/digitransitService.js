import axios from 'axios'
import * as R from 'ramda'

const ENDPOINT = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

const handleResponse = R.pipe(
  R.path(['data', 'stopsByRadius', 'edges']),
  R.map(R.path(['node', 'stop', 'stoptimesWithoutPatterns'])),
  R.flatten,
  R.sortBy(R.prop('reatimeArrival'))
)

// TODO: Reject fields that are not needed in frontend
const query = `{
  stopsByRadius(lat:60.204561, lon:24.961834, radius:400) {
    edges {
      node {
        stop {
          stoptimesWithoutPatterns {
            scheduledArrival
            realtimeArrival
            arrivalDelay
            scheduledDeparture
            realtimeDeparture
            departureDelay
            realtime
            realtimeState
            serviceDay
            headsign
            trip {
              routeShortName
            }
    			}
        }
      }
    }
  }
}`

export const fetchSchedules = () =>
  axios.post(ENDPOINT, { query, variables: null })
    .then((handleResponse)