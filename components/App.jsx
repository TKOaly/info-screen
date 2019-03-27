import React from 'react'

import Grid from '@material-ui/core/Grid'
import EventList from './EventList.jsx'
import { Typography } from '@material-ui/core';

export default function App({initialState}) {
  const { events } = initialState 

  return (
    <Grid container>
      <Grid item md={6}>
        <Typography variant="h5">Upcoming events</Typography>
        <EventList initialEvents={events} />
      </Grid>
      <Grid item md={6}>
        <img src="/img/reaktorlogo.png" />
      </Grid>
    </Grid>
  )
}
