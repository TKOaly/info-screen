import React, {useState, useEffect} from 'react'
import List from '@material-ui/core/List';
import { ListItem, ListItemText } from '@material-ui/core';
import axios from 'axios'
import { formatDistance } from 'date-fns'

export default function EventList({initialEvents}) {
  const [events, updateEvents] = useState(initialEvents)

  useEffect(() => {
    const intervalId = setInterval(() =>
      fetchEvents()
        .then(newEvents => updateEvents(newEvents))
    , 10000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <List dense={true}>
      {
        events.map(({name, starts}) => 
        <ListItem>
          <ListItemText primary={name} secondary={formatDistance(new Date(starts), new Date())}></ListItemText>
        </ListItem>)
      }
    </List>
  )
}

function fetchEvents() {
  return axios
    .get('/api/events/upcoming')
    .then(({data}) => data)
}
