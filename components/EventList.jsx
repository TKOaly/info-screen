import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import { ListItem, ListItemText, Chip, ListSubheader } from "@material-ui/core";
import axios from "axios";
import { isAfter, isToday, format } from "date-fns";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit
  },
  noMargin: {
    margin: "0"
  }
});

const getFormat = (subtitle) => {
  switch (subtitle) {
    case 'This week':
      return "'this' EEEE"
    case 'Next week':
      return "'next' EEEE"
    default:
      return "dd.MM."
  }
}

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
      {
        Object.entries(events).map(([subtitle, events]) => (
          <>
            <h3 className={classes.noMargin}>{subtitle}</h3>
            {events.map(({ name, starts }) => (
              <ListItem>
                <ListItemText style={{ fontSize: "20px" }} primary={name} />
                {
                  subtitle !== 'Today' && subtitle !== 'Tomorrow' &&
                  <Chip
                    className={classes.chip}
                    color={
                      isToday(new Date(starts)) ? "primary" : "default"
                    }
                    label={
                      isAfter(new Date(), new Date(starts))
                        ? "now!"
                        : format(new Date(starts), getFormat(subtitle))
                    }
                  />
                }
              </ListItem>
            ))}
            <hr/>     
          </>
        ))
      }
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
