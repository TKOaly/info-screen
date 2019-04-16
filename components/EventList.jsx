import React, {useState, useEffect} from 'react'
import List from '@material-ui/core/List';
import { ListItem, ListItemText, Chip } from '@material-ui/core';
import axios from 'axios'
import { formatDistance, format } from 'date-fns'

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
          <ListItemText style={{fontSize: '20px'}} primary={name} />
          <Chip label={`${formatDistance(new Date(starts), new Date())} ${format(new Date(starts), 'MM.dd.YYY')}`} />
        </ListItem>)
      }
    </List>
  )
}

const fetchEvents = () => {
  return axios
    .get('/api/events/upcoming')
    .then(({data}) => data)
}
