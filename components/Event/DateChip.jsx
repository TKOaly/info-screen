import { Chip } from "@mui/material";
import { isToday, isTomorrow, format, isThisWeek } from "date-fns";
import React from "react";
import PropTypes from "prop-types";

const DateChip = ({ startDate, now }) => {
  if (isToday(startDate) || isTomorrow(startDate)) {
    return <Chip color="default" label={format(startDate, "HH:mm")} />;
  }

  if (isThisWeek(startDate)) {
    return <Chip color="default" label={format(startDate, "EEEE HH:mm")} />;
  }

  return <Chip color="default" label={format(startDate, "dd.MM.")} />;
};

// Props are dates ( Date objects )
DateChip.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  now: PropTypes.instanceOf(Date)
};

export default DateChip;
