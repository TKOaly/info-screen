import { ListItem, ListItemText } from "@mui/material";
import React from "react";
import EventChips from "./EventChips";

const Event = ({ event, subtitle }) => {
  return (
    <ListItem key={event.name}>
      <ListItemText style={{ fontSize: "20px" }} primary={event.name} />
      <EventChips event={event} subtitle={subtitle} />
    </ListItem>
  );
};

export default Event;
