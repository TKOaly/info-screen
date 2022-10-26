import React from "react";
import { List, Typography } from "@mui/material";
import useSWR from "swr";
import { red } from "@mui/material/colors";
import Event from "./Event/Event";

const subtitleHeadingStyle = {
  fontSize: "1.5rem",
  fontWeight: "700"
};
const errorHeadingStyle = {
  fontSize: "18px",
  fontWeight: "700",
  opacity: 0.5,
  color: red[500],
  marginBottom: "1rem"
};

const fetcher = url => fetch(url).then(res => res.json());

const EventList = () => {
  const { data: events, error } = useSWR("/api/events/upcoming", fetcher, {
    refreshInterval: 5 * 60 * 1000 // 5 minutes
  });

  return (
    <List dense={true}>
      {error && (
        <Typography variant="h3" sx={{ ...errorHeadingStyle }}>
          Failed to load events, this list may be out of date.
        </Typography>
      )}
      {events &&
        Object.entries(events).map(([subtitle, events]) => (
          <React.Fragment key={subtitle}>
            <Typography variant="h3" sx={subtitleHeadingStyle}>
              {subtitle}
            </Typography>
            {events.map(event => (
              <Event key={event.id} event={event} subtitle={subtitle} />
            ))}
            <hr />
          </React.Fragment>
        ))}
    </List>
  );
};

export default EventList;
