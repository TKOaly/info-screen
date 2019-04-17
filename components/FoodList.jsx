import React, { useState, useEffect } from 'react'
import { List, ListSubheader, ListItem, ListItemText, Chip, Typography } from '@material-ui/core'
import { Carousel } from 'react-responsive-carousel'
import axios from 'axios'

export default function FoodList(initialFoodlists) {
  const [{chemicum, exactum}, updateFoodlists] = useState(initialFoodlists)

  useEffect(() => {
    const intervalId = setInterval(() =>
      fetchFoodlists()
        .then(newFoodlist => updateFoodlists(newFoodlist))
    , 60000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <Carousel
        showThumbs={false}
        showArrows={false}
        infiniteLoop={true}
        autoPlay={true}
        showIndicators={false}
        showStatus={false}
        interval={10000}
        stopOnHover={false}
      >
        <div>
          <Typography variant="h5">Exactum</Typography>
          <List>
            {parseFoodlisting(exactum)}
          </List>
        </div>
        <div>      
          <Typography variant="h5">Chemicum</Typography>
          <List>
            {parseFoodlisting(chemicum)}
          </List>
        </div>
      </Carousel>
    </div>
  )
}

const parseFoodlisting = (foodlist) => {
  const keys = Object.keys(foodlist)
  return keys.map((key, i) => {
    const foodItems = foodlist[key]
    return (
      <>
        <ListSubheader key={i}>{key}</ListSubheader>
          {mapFooditems(foodItems)}
      </>
    )
  })
}

const mapFooditems = (foodItems) => 
  foodItems.map(({name, meta}, i) => (
    <ListItem key={i}>
      <ListItemText inset={true} primary={name}></ListItemText>
      {meta.allergies.length > 0 && meta.allergies.split(' ').map(allergy => <Chip label={allergy} />)}
    </ListItem>
  ))

const fetchFoodlists = () =>
  Promise.all([axios.get('/api/foodlists/exactum'), axios.get('/api/foodlists/chemicum')])
    .then(([exaRes, chemRes]) => {
      return {
        exactum: exaRes.data,
        chemicum: chemRes.data 
      }
    })
    .catch(e => console.error(e))
    