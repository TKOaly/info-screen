import React from "react";
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

  return {
    props: {
      fallback: {
        "/api/events/upcoming": events,
        "/api/foodlists/exactum": exactum,
        "/api/foodlists/chemicum": chemicum
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

export default Index;
