import Chip from '@/components/Chip';
import TimeChip from '@/components/Events/TimeChip';
import { Lecture } from '@/server/lectures';
import DateChip from '../../../components/Events/DateChip';

export const LectureBox = async ({ lecture }: { lecture: Lecture }) => {
	const { start } = lecture;
	if (!start) return null;

	return (
		<div
			className={`flex flex-col justify-between gap-3 rounded-2xl bg-grey-950 p-3 pt-2 `}
			key={lecture.uid}
		>
			<p className="text-wrap text-xl font-semibold">{lecture.summary}</p>
			<div className="flex items-end justify-between gap-2">
				<div className="flex flex-col items-start gap-2">
					<TimeChip
						startDate={start}
						className="bg-transparent text-grey-100 ring-2 ring-grey-700"
					/>
					<DateChip
						startDate={start}
						showWeekday
						showTime={false}
						className="bg-transparent text-grey-100 ring-2 ring-grey-700"
					/>
				</div>
				<div className="-mr-2 flex flex-col items-end gap-2">
					{lecture.program && (
						<Chip className="bg-transparent">
							{lecture.program}
						</Chip>
					)}
					{lecture.location && lecture.location.length > 0 && (
						<Chip className="bg-transparent">
							{lecture.location}
						</Chip>
					)}
				</div>
			</div>
		</div>
	);
};
