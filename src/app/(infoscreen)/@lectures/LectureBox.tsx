import Chip from '@/components/Chip';
import TimeChip from '@/components/Events/TimeChip';
import { Lecture } from '@/server/lectures';
import DateChip from '../../../components/Events/DateChip';

export const LectureBox = async ({ lecture }: { lecture: Lecture }) => {
	const { start } = lecture;
	if (!start) return null;

	return (
		<div
			className={`flex flex-col justify-between gap-2 rounded-2xl border-2 border-black p-3 pt-1 `}
			key={lecture.uid}
		>
			<p className="text-wrap text-xl">{lecture.summary}</p>
			<div className="flex items-end justify-between gap-2">
				<div className="flex flex-col items-start gap-2">
					<TimeChip
						startDate={start}
						className=" bg-transparent text-black ring-2 ring-black"
					/>
					<DateChip
						startDate={start}
						showWeekday
						showTime={false}
						className="bg-transparent text-black ring-2 ring-black"
					/>
				</div>
				<div className="flex flex-col items-end gap-2">
					{lecture.program && (
						<Chip className=" bg-black text-white">
							{lecture.program}
						</Chip>
					)}
					{lecture.location && lecture.location.length > 0 && (
						<Chip className=" bg-black text-white">
							{lecture.location}
						</Chip>
					)}
				</div>
			</div>
		</div>
	);
};
