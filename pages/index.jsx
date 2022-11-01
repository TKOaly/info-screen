import React from "react";
import PropTypes from "prop-types";
import {
  fetchSciencePercentage,
  fetchTotalPercentage
} from "services/repcoVoteService";
import { fetchGroupedEvents } from "services/tkoalyEventService";
import {
  fetchChecmicumFoodlist,
  fetchExactumFoodlist
} from "services/unicafeFoodListService";
import { SWRConfig } from "swr/_internal";
import App from "../components/App";

export async function getStaticProps() {
  const events = await fetchGroupedEvents();
  const chemicum = await fetchChecmicumFoodlist();
  const exactum = await fetchExactumFoodlist();
  const voting_activity = {
    total: await fetchTotalPercentage(),
    faculty: await fetchSciencePercentage()
  };

  return {
    props: {
      fallback: {
        "/api/events/upcoming": events,
        "/api/foodlists/exactum": exactum,
        "/api/foodlists/chemicum": chemicum,
        "/api/voting_activity": voting_activity
      }
    }
  };
}

const Index = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <App />
    </SWRConfig>
  );
};

// fallback is an js-object
Index.propTypes = {
  fallback: PropTypes.object
};

export default Index;
