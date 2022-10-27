import { ListItem, ListItemText } from "@mui/material";
import React from "react";
import EventChips from "./EventChips";

const Event = ({ event }) => {
  return (
    <ListItem key={event.name}>
      <ListItemText style={{ fontSize: "20px" }} primary={event.name} />
      <EventChips event={event} />
    </ListItem>
  );
};

export default Event;
