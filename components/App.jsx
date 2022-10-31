import { Grid, Typography } from "@mui/material";
import { isBefore } from "date-fns";
import React from "react";

import EventList from "./EventList.jsx";
import FoodList from "./FoodList.jsx";
import Logo from "./Logo.jsx";
import VotePercentage from "./VotePercentage.jsx";

export default function App() {
  const votingActive = isBefore(new Date(), new Date("2022-11-02T20:00:00"));
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Events
        </Typography>
        <EventList />
        {votingActive && <VotePercentage />}
      </Grid>
      <Grid item xs={6}>
        <FoodList />
      </Grid>
      <Logo />
    </Grid>
  );
}
