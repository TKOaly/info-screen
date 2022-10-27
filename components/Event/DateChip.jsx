const DateChip = ({ startDate, subtitle, now }) => {
  if (isToday(startDate) || isTomorrow(startDate)) {
    return <Chip color="default" label={format(startDate, "HH:mm")} />;
  }

  if (isThisWeek(startDate)) {
    return <Chip color="default" label={format(startDate, "EEEE HH:mm")} />;
  }

  return <Chip color="default" label={format(startDate, "dd.MM.")} />;
};

export default DateChip;
