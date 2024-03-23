import { merge } from '@/lib/utils';
import { format, isThisWeek, isToday, isTomorrow } from 'date-fns';
import Chip from '../Chip';

const getLabelFormat = (
	startDate: Date,
	showWeekday?: boolean,
	showTime?: boolean
) => {
	if (isToday(startDate)) return `'Today'${showTime ? ' HH:mm' : ''}`;
	if (isTomorrow(startDate)) return `'Tomorrow'${showTime ? ' HH:mm' : ''}`;
	if (isThisWeek(startDate)) return `EEEE${showTime ? ' HH:mm' : ''}`;
	return `${showWeekday ? 'EEEE ' : ''}dd.MM.`;
};

const DateChip = ({
	startDate,
	showWeekday = false,
	showTime = true,
	className,
}: {
	startDate: Date;
	showWeekday?: boolean;
	showTime?: boolean;
	className?: string;
}) => {
	const labelFormat = getLabelFormat(startDate, showWeekday, showTime);
	return (
		<Chip
			className={merge(
				'bg-white/10 text-white',
				className,
				isToday(startDate) && 'bg-sky-600 text-white'
			)}
		>
			{format(startDate, labelFormat)}
		</Chip>
	);
};

export default DateChip;
