import React from "react";
import App from "../components/App";
import { fetchUpcomingEvents } from "../services/tkoalyEventService";
import {
  fetchChecmicumFoodlist,
  fetchExactumFoodlist
} from "../services/unicafeFoodListService";
import { fetchUpcomingEvents as fetchPajaEvents } from "../services/toskaPajaCalendarService"; // eslint-disable-line
import * as R from "ramda";
import { enableCoronaInfo } from "../config.json"
import { compareAsc } from "date-fns";

import '../css/carousel.min.css';
import '../css/overrides.css';

class Index extends React.Component {
    static async getInitialProps() {
        const getEvents = enableCoronaInfo ?
            []
            : Promise.all([fetchUpcomingEvents(), fetchPajaEvents()]).then(([tkoalyEvents, pajaEvents]) => {
                return R.pipe(
                R.concat(pajaEvents),
                R.sort((a, b) => compareAsc(new Date(a.starts), new Date(b.starts)))
                )(tkoalyEvents);
             })
        const [events, chemicum, exactum] = await Promise.all([
            getEvents,
            fetchChecmicumFoodlist(),
            fetchExactumFoodlist()
        ]);

        return {
            events, chemicum, exactum
        }
    }

    render() {
        return (
            <App initialState={this.props} />
        )
    }
}

export default Index;