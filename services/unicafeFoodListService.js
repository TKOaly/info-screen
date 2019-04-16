import request from 'request-promise'
import { format } from 'date-fns'
import en from 'date-fns/locale/en-US'
import { groupBy, flatten } from 'ramda'

const EXACTUM_FOOD_URL = 'https://messi.hyyravintolat.fi/publicapi/restaurant/11'
const CHEMI_FOOD_URL = 'https://messi.hyyravintolat.fi/publicapi/restaurant/10'

export const fetchExactumFoodlist = () => {
  return request
    .get(EXACTUM_FOOD_URL)
    .then(JSON.parse)
    .then(formatResponse)
}

export const fetchChecmicumFoodlist = () => {
  return request
    .get(CHEMI_FOOD_URL)
    .then(JSON.parse)
    .then(formatResponse)
}

function formatResponse(response) {
  const { data } = response
  const { data: foodlistData } = data.find(({date_en}) => date_en === format(new Date(), 'EEE dd.MM', {locale: en}))
  if (foodlistData) {
    const foodlistDataEn = foodlistData.map(({name_en, price, meta}) => ({ name: name_en, priceName: price.name, meta: { diet: meta['0'].join(' '), allergies: meta['1'].join(' ')}}))
    const groupByPrice = groupBy(({priceName}) => priceName.toLowerCase())
    return groupByPrice(foodlistDataEn)
  }
}