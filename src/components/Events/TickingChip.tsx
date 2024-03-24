'use client';

import { differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import Chip from '../Chip';

const padZero = (num: number) => num.toString().padStart(2, '0');
const formatCountdown = (diff: number) => {
	if (diff < 0) return false;

	const days = Math.floor(diff / 86400);
	const hours = Math.floor((diff - days * 86400) / 3600);
	const minutes = Math.floor((diff - days * 86400 - hours * 3600) / 60);
	const seconds = diff - days * 86400 - hours * 3600 - minutes * 60;

	let str = '';
	if (days > 0) str += `${days}d `;
	if (hours > 0) str += `${padZero(hours)}:`;
	str += `${padZero(minutes)}:`;
	str += `${padZero(seconds)}`;

	return str;
};

const useTickingLabel = (targetDate: Date) => {
	const [label, setLabel] = useState('soon');

	useEffect(() => {
		const updateLabel = () => {
			const newLabel = formatCountdown(
				differenceInSeconds(targetDate, new Date())
			);
			if (newLabel) setLabel(newLabel);
		};

		updateLabel();
		const interval = setInterval(updateLabel, 1000);

		return () => clearTimeout(interval);
	}, [targetDate, setLabel]);

	return [label];
};

type TickingChipProps = {
	end: Date;
	prefix?: string;
} & React.ComponentProps<typeof Chip>;

const TickingChip = ({ end, prefix = '', ...rest }: TickingChipProps) => {
	const [label] = useTickingLabel(end);
	if (!label) {
		return null;
	}

	return <Chip {...rest}>{`${prefix} ${label}`}</Chip>;
};

export default TickingChip;
