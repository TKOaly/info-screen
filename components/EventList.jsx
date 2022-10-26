import React from "react";
import { isAfter, isToday, format } from "date-fns";
import { List, ListItem, ListItemText, Chip, Typography } from "@mui/material";
import useSWR from "swr";
import { red } from "@mui/material/colors";

const getFormat = subtitle => {
  switch (subtitle) {
    case "This week":
      return "'this' EEEE";
    case "Next week":
      return "'next' EEEE";
    default:
      return "dd.MM.";
  }
};

const smallHeaderStyle = { fontSize: "18px", fontWeight: "700" };
const errorHeaderStyle = {
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
        <Typography
          variant="h3"
          sx={{ ...smallHeaderStyle, ...errorHeaderStyle }}
        >
          Failed to load events, this list may be out of date.
        </Typography>
      )}
      {events &&
        Object.entries(events).map(([subtitle, events]) => (
          <React.Fragment key={subtitle}>
            <Typography variant="h3" sx={smallHeaderStyle}>
              {subtitle}
            </Typography>
            {events.map(({ name, starts }) => (
              <ListItem key={name}>
                <ListItemText style={{ fontSize: "20px" }} primary={name} />
                {subtitle !== "Today" && subtitle !== "Tomorrow" && (
                  <Chip
                    color={isToday(new Date(starts)) ? "primary" : "default"}
                    label={
                      isAfter(new Date(), new Date(starts))
                        ? "now!"
                        : format(new Date(starts), getFormat(subtitle))
                    }
                  />
                )}
              </ListItem>
            ))}
            <hr />
          </React.Fragment>
        ))}
    </List>
  );
};

export default EventList;
