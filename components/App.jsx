import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import Grid from "@material-ui/core/Grid";
import EventList from "./EventList.jsx";
import FoodList from "./FoodList.jsx";
import Covid19 from "./Covid19.jsx";
import { enableCoronaInfo } from "../config.json";

export default function App({ initialState }) {
  const { chemicum, exactum, events } = initialState;

  /* React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []); */

  const leftGrid =
    <Grid item md={6}>
      <h2 lang="fi">Tulevat tapahtumat</h2>
      <h3 lang="en">Upcoming events</h3>
      {enableCoronaInfo && <Covid19 />}
      <EventList initialEvents={events} />
    </Grid>

  return (
    <>
      <CssBaseline />
      <Grid container>
        {leftGrid}
        <Grid item md={6}>
          <FoodList chemicum={chemicum} exactum={exactum} />
          <div className="sponsor">
            <img src="/static/tekis.png" className="logo-tekis" />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
