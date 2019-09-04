import { fetchSchedules } from '../services/digitransitService'

export const getDigitransitSchedules = (_, res) =>{
  fetchSchedules()
    .then(schedules => {
      res.json(schedules)
    })
}