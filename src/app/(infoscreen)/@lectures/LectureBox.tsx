import Chip from '@/components/Chip';
import { Lecture } from '@/server/lectures';
import DateChip from '../../../components/Events/DateChip';

export const LectureBox = async ({ lecture }: { lecture: Lecture }) => {
	const { start } = lecture;
	if (!start) return null;

	return (
		<div
			className={`flex flex-col justify-between gap-2 rounded-2xl border-2 border-black p-3 pt-2 `}
			key={lecture.uid}
		>
			<p className="text-wrap text-xl">{lecture.summary}</p>
			<div className="flex flex-wrap justify-between gap-2">
				<DateChip
					startDate={start}
					className="bg-transparent text-black ring-2 ring-black"
				/>
				{lecture.location && lecture.location.length > 0 ? (
					<Chip className="bg-black text-white">
						{lecture.location}
					</Chip>
				) : (
					<p></p>
				)}
			</div>
		</div>
	);
};
