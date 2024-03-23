import { merge } from '@/lib/utils';
import { format, isToday } from 'date-fns';
import Chip from '../Chip';

const TimeChip = ({
	startDate,
	className,
}: {
	startDate: Date;
	className?: string;
}) => {
	return (
		<Chip
			className={merge(
				'bg-white/10 text-white',
				className,
				isToday(startDate) && 'bg-sky-600 text-white'
			)}
		>
			{format(startDate, '⏲ HH:mm')}
		</Chip>
	);
};

export default TimeChip;
