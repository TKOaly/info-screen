import React from "react";
import App from "../components/App";
import { fetchGroupedEvents } from "../services/tkoalyEventService";
import {
  fetchChecmicumFoodlist,
  fetchExactumFoodlist
} from "../services/unicafeFoodListService";

import '../css/carousel.min.css';
import '../css/overrides.css';

class Index extends React.Component {
    static async getInitialProps() {
        const getEvents = fetchGroupedEvents()
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