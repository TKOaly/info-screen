'use client';

import I18n from '@/components/I18n/I18n';
import {
	addHours,
	differenceInMilliseconds,
	format,
	isAfter,
	isToday,
	isValid,
	isWithinInterval,
	startOfDay,
} from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import Chip from '../../../components/Chip';
import TickingChip from '../../../components/Events/TickingChip';

const noteEmoji = '📝';
const countdownHours = 2;

const getRegistrationState = (startDate: Date, endDate: Date, now: Date) => {
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

type RegistrationChipProps = {
	startDate: Date;
	endDate: Date;
	now: Date;
};

const RegistrationChip = ({
	startDate,
	endDate,
	now,
}: RegistrationChipProps) => {
	const [registrationState, setRegistrationState] = useState<
		'none' | 'countdown' | 'open' | 'closing' | 'future' | 'unknown'
	>(getRegistrationState(startDate, endDate, now));

	const updateRegistrationState = useCallback(
		() =>
			setRegistrationState(
				getRegistrationState(startDate, endDate, new Date())
			),
		[startDate, endDate]
	);

	useEffect(() => {
		updateRegistrationState();
	}, [startDate, endDate, updateRegistrationState]);

	useEffect(() => {
		const nextUpdates = {
			none: () => undefined,
			countdown: () => differenceInMilliseconds(startDate, now),
			open: () =>
				isValid(endDate) &&
				differenceInMilliseconds(startOfDay(endDate), now),
			closing: () => differenceInMilliseconds(startDate, now),
			future: () =>
				differenceInMilliseconds(
					addHours(startDate, -countdownHours),
					now
				),
			unknown: () => undefined,
		};
		const nextUpdate = nextUpdates[registrationState]();

		if (nextUpdate) {
			const timeoutId = setTimeout(updateRegistrationState, nextUpdate);
			return () => clearTimeout(timeoutId);
		}
	}, [registrationState, endDate, now, startDate, updateRegistrationState]);

	switch (registrationState) {
		case 'open':
			return (
				<Chip variant="success">
					<I18n>
						{`${noteEmoji} Ilmoittautuminen auki // ${noteEmoji} Registration open`}
					</I18n>
				</Chip>
			);
		case 'future':
			return (
				<Chip variant="info">
					<I18n>
						{`${noteEmoji} Ilmoittautuminen alkaa ${format(startDate, 'dd.MM. HH:mm')} // ${noteEmoji} Registration starts ${format(startDate, 'dd.MM. HH:mm')}`}
					</I18n>
				</Chip>
			);
		case 'countdown':
			return (
				<TickingChip
					variant="warning"
					end={startDate}
					prefix={`${noteEmoji} Registration starts in `}
				/>
			);
		case 'closing':
			return (
				<Chip variant="error">
					<I18n>
						{`${noteEmoji} Sulkeutuu tänään // ${noteEmoji} closes today`}
					</I18n>
				</Chip>
			);
	}

	return null;
};

export default RegistrationChip;
