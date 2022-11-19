import React from "react";
import PropTypes from "prop-types";
import { fetchGroupedEvents } from "../services/combinedEventService";
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

  return {
    props: {
      fallback: {
        "/api/events/upcoming": events,
        "/api/foodlists/exactum": exactum,
        "/api/foodlists/chemicum": chemicum
      }
    },
    // Revalidate every minute
    // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
    revalidate: 60
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
