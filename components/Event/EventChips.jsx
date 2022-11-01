import { Box } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import DateChip from "./DateChip";
import RegistrationChip from "./RegistrationChip";

const EventChips = ({ event }) => {
  const { starts, registration_starts, registration_ends } = event;
  const now = new Date();
  const startDate = new Date(starts);
  const regStartDate = registration_starts && new Date(registration_starts);
  const regEndDate = registration_ends && new Date(registration_ends);

  return (
    <Box sx={{ display: "flex", gap: "1ch" }}>
      <RegistrationChip
        startDate={regStartDate}
        endDate={regEndDate}
        now={now}
      />
      <DateChip startDate={startDate} now={now} />
    </Box>
  );
};

// prop is object "event"
EventChips.propTypes = {
  event: PropTypes.object
};

export default EventChips;
