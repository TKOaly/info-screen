import { merge } from '@/lib/utils';
import { format, isThisWeek, isToday, isTomorrow } from 'date-fns';
import Chip from '../Chip';
import I18n from '../I18n/I18n';
import I18nFormatDate from '../I18n/I18nFormatDate';

const getLabelFormat = (
	startDate: Date,
	showWeekday?: boolean,
	showTime?: boolean
) => {
	if (isToday(startDate))
		return `'Tänään'${showTime ? ' HH:mm' : ''} // 'Today'${showTime ? ' HH:mm' : ''}`;
	if (isTomorrow(startDate))
		return `'Huomenna'${showTime ? ' HH:mm' : ''} // 'Tomorrow'${showTime ? ' HH:mm' : ''}`;
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
				isToday(startDate) && 'bg-blue-600 text-white'
			)}
		>
			{/\/\//.test(labelFormat) ? (
				<I18n>{format(startDate, labelFormat)}</I18n>
			) : (
				<I18nFormatDate date={startDate} format={labelFormat} />
			)}
		</Chip>
	);
};

export default DateChip;
