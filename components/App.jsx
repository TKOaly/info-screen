import { Grid, Typography } from "@mui/material";
import React from "react";

import EventList from "./EventList.jsx";
import FoodList from "./FoodList.jsx";
import Logo from "./Logo.jsx";
import VotePercentage from "./VotePercentage.jsx";

export default function App() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Events
        </Typography>
        <EventList />
        <VotePercentage />
      </Grid>
      <Grid item xs={6}>
        <FoodList />
      </Grid>
      <Logo />
    </Grid>
  );
}
