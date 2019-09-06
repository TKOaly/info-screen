import React from "react";
import App from "../components/App";
import { fetchUpcomingEvents } from "../services/tkoalyEventService";
import {
  fetchChecmicumFoodlist,
  fetchExactumFoodlist
} from "../services/unicafeFoodListService";

import '../css/carousel.min.css';
import '../css/overrides.css';

class Index extends React.Component {
    static async getInitialProps() {
        const [events, chemicum, exactum] = await Promise.all([
            fetchUpcomingEvents(),
            fetchChecmicumFoodlist(),
            fetchExactumFoodlist()
        ]);

        return {
            events, chemicum, exactum
        }
    }

    render() {
        console.log(this.props)
        return (
            <App initialState={this.props} />
        )
    }
}

export default Index;