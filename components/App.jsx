import React from 'react'

import Grid from '@material-ui/core/Grid'
import EventList from './EventList.jsx'
import { Typography } from '@material-ui/core'
import FoodList from './FoodList.jsx'

export default function App({initialState}) {
  const { chemicum, exactum, events } = initialState

  return (
    <Grid container>
      <Grid item md={6}>
        <Typography variant="h3">Upcoming events</Typography>
        <EventList initialEvents={events} />
      </Grid>
      <Grid item md={6}>
        <FoodList chemicum={chemicum} exactum={exactum} />
        <div className="sponsor">
          <img src="/img/tekis.png" className="logo-tekis" />
          <img src="/img/reaktorlogo.png" className="logo-reaktor" />
        </div>
      </Grid>
    </Grid>
  )
}
