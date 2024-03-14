import { Chip } from '@mui/material';
import TickingChip from 'components/TickingChip';
import {
	isValid,
	isAfter,
	isWithinInterval,
	addHours,
	isToday,
	differenceInMilliseconds,
	startOfDay,
	format,
} from 'date-fns';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const noteEmoji = '📝';
const countdownHours = 2;

const getRegistrationState = (startDate, endDate, now) => {
	const validStartDate = isValid(startDate);
	const validEndDate = isValid(endDate);

	// An event cannot have registration if it does not start at some point
	if (!validStartDate) return 'none';

	// If the event does not have an end date and we're past start date, registration is open
	if (!validEndDate && isAfter(now, startDate)) return 'open';

	// If the registration is starting within the next 2 hours, show a countdown
	if (
		isWithinInterval(startDate, {
			start: now,
			end: addHours(now, countdownHours),
		})
	)
		return 'countdown';

	// If the start date is still in the future, it's future
	if (isAfter(startDate, now)) return 'future';

	// If there's an end date and it's today, it's closing.
	if (validEndDate && isToday(endDate)) return 'closing';

	// If the event has an end date and we're between start and end, registration is open
	if (
		validEndDate &&
		isWithinInterval(now, {
			start: startDate,
			end: endDate,
		})
	)
		return 'open';

	return 'unknown';
};

const RegistrationChip = ({ startDate, endDate, now }) => {
	// 'none' | 'open' | 'future' | 'countdown' | 'closing'
	const [registrationState, setRegistrationState] = useState(
		getRegistrationState(startDate, endDate, now)
	);
	const updateRegistrationState = () =>
		setRegistrationState(
			getRegistrationState(startDate, endDate, new Date())
		);

	useEffect(() => {
		let nextUpdate;
		switch (registrationState) {
			case 'open': {
				// Open forever if it does not have an end date
				if (!isValid(endDate)) break;
				// open -> closing when day where closes begins
				nextUpdate = differenceInMilliseconds(startOfDay(endDate), now);
				break;
			}

			case 'future': {
				// future -> countdown when within countdownHours of start
				nextUpdate = differenceInMilliseconds(
					addHours(startDate, -countdownHours),
					now
				);
				break;
			}

			case 'countdown': {
				// countdown -> open when registration starts
				nextUpdate = differenceInMilliseconds(startDate, now);
				break;
			}

			case 'closing': {
				// closing -> none when registration ends
				nextUpdate = differenceInMilliseconds(endDate, now);
				break;
			}
		}

		if (nextUpdate) {
			const timeoutId = setTimeout(updateRegistrationState, nextUpdate);
			return () => clearTimeout(timeoutId);
		}
	}, [registrationState]);

	switch (registrationState) {
		case 'open':
			return <Chip color="success" label={noteEmoji} />;
		case 'future':
			return (
				<Chip
					color="info"
					label={`${noteEmoji} ${format(startDate, 'dd.MM. HH:mm')}`}
				/>
			);
		case 'countdown':
			return (
				<TickingChip
					color="warning"
					end={startDate}
					prefix={`${noteEmoji} starts in `}
				/>
			);
		case 'closing':
			return <Chip color="error" label={`${noteEmoji} closes today`} />;
	}

	return null;
};

// Props are dates ( Date objects )
RegistrationChip.propTypes = {
	startDate: PropTypes.instanceOf(Date),
	endDate: PropTypes.instanceOf(Date),
	now: PropTypes.instanceOf(Date),
};

export default RegistrationChip;
