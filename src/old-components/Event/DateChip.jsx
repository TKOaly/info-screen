import { Chip } from '@mui/material';
import { isToday, isTomorrow, format, isThisWeek } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';

const getLabelFormat = (startDate) => {
	if (isToday(startDate)) return "'Today' HH:mm";
	if (isTomorrow(startDate)) return "'Tomorrow' HH:mm";
	if (isThisWeek(startDate)) return 'EEEE HH:mm';
	return 'dd.MM.';
};

const DateChip = ({ startDate }) => {
	const labelFormat = getLabelFormat(startDate);
	return (
		<Chip
			color={isToday(startDate) ? 'info' : 'default'}
			label={format(startDate, labelFormat)}
		/>
	);
};

// Props are dates ( Date objects )
DateChip.propTypes = {
	startDate: PropTypes.instanceOf(Date),
	now: PropTypes.instanceOf(Date),
};

export default DateChip;
