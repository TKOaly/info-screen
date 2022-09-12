import React from "react";
import App from "../components/App";
import { fetchUpcomingEvents } from "../services/tkoalyEventService";
import { fetchFoodlists } from "../services/unicafeFoodListService";
import { enableCoronaInfo } from "../config.json"

import '../css/carousel.min.css';
import '../css/overrides.css';

class Index extends React.Component {
    static async getInitialProps() {
        const getEvents = enableCoronaInfo ? [] : fetchUpcomingEvents()
        const [events, foodlists] = await Promise.all([
            getEvents,
            fetchFoodlists()
        ]);

        return {
            events, ...foodlists
        }
    }

    render() {
        return (
            <App initialState={this.props} />
        )
    }
}

export default Index;
