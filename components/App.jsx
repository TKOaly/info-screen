import React from 'react'

import Grid from '@material-ui/core/Grid'
import EventList from './EventList.jsx'
import { Typography } from '@material-ui/core';

export default function App({initialState}) {
  const { chemicum, exactum, events } = initialState

  return (
    <Grid container>
      <Grid>
        <Foodlist chemicum={chemicum} exactum={exactum} />
      </Grid>
      <Grid>
        <EventListCont events={events} />
      </Grid>
    </Grid>
  )
}

const Foodlist = ({chemicum, exactum}) => {
  return (
    <div>
      <Typography variant="h5">Exactum</Typography>
        <ul>
          {Object.keys(exactum).map(key => (<li><h1>{key}</h1><ul>{exactum[key].map(({name}) => (<li>{name}</li>))}</ul></li>))}
        </ul>
        <Typography variant="h5">Chemicum</Typography>
        <ul>
          {Object.keys(chemicum).map(key => (<li><h1>{key}</h1><ul>{chemicum[key].map(({name}) => (<li>{name}</li>))}</ul></li>))}
        </ul>
    </div>
  )
}

const EventListCont = ({events}) => {
  return (
    <div>
      <Typography variant="h5">Upcoming events</Typography>
      <EventList initialEvents={events} />
    </div>
  )
}
