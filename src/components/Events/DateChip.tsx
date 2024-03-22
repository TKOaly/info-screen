import { merge } from '@/lib/utils';
import { format, isThisWeek, isToday, isTomorrow } from 'date-fns';
import Chip from '../Chip';

const getLabelFormat = (startDate: Date) => {
	if (isToday(startDate)) return "'Today' HH:mm";
	if (isTomorrow(startDate)) return "'Tomorrow' HH:mm";
	if (isThisWeek(startDate)) return 'EEEE HH:mm';
	return 'dd.MM.';
};

const DateChip = ({
	startDate,
	className,
}: {
	startDate: Date;
	className?: string;
}) => {
	const labelFormat = getLabelFormat(startDate);
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
