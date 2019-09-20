import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import { ListItem, ListItemText, Chip } from "@material-ui/core";
import axios from "axios";
import { formatDistance, format, isSameDay, isAfter } from "date-fns";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit
  }
});

const EventList = ({ initialEvents, classes }) => {
  const [events, updateEvents] = useState(initialEvents);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        fetchEvents()
          .then(newEvents => updateEvents(newEvents))
          .catch(_ => {}),
      10000
    );
    return () => clearInterval(intervalId);
  }, []);

  return (
    <List dense={true}>
      {events.map(({ name, starts }) => (
        <ListItem>
          <ListItemText style={{ fontSize: "20px" }} primary={name} />
          <Chip
            className={classes.chip}
            color={
              isSameDay(new Date(starts), new Date()) ? "primary" : "default"
            }
            label={
              isAfter(new Date(), new Date(starts))
                ? "now!"
                : `in ${formatDistance(new Date(starts), new Date())}`
            }
          />
          <Chip
            className={classes.chip}
            label={format(new Date(starts), "dd.MM.YYY")}
            variant={"outlined"}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(EventList);

const fetchEvents = () =>
  axios
    .get("/api/events/upcoming")
    .then(({ data }) => data)
    .catch(e => {
      console.error(e);
      throw e;
    });
