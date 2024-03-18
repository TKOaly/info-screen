import { format, isThisWeek, isToday, isTomorrow } from 'date-fns';
import Chip from '../Chip';

const getLabelFormat = (startDate: Date) => {
	if (isToday(startDate)) return "'Today' HH:mm";
	if (isTomorrow(startDate)) return "'Tomorrow' HH:mm";
	if (isThisWeek(startDate)) return 'EEEE HH:mm';
	return 'dd.MM.';
};

const DateChip = ({ startDate }: { startDate: Date }) => {
	const labelFormat = getLabelFormat(startDate);
	return (
		<Chip variant={isToday(startDate) ? 'info' : 'primary'}>
			{format(startDate, labelFormat)}
		</Chip>
	);
};

export default DateChip;
