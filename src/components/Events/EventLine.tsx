import { type TKOalyEvent } from '@/server/events';
import DateChip from './DateChip';
import RegistrationChip from './RegistrationChip';

export const EventLine = async ({
	event,
	idx,
}: {
	event: TKOalyEvent;
	idx: number;
}) => {
	const { starts, registration_starts, registration_ends } = event;

	const startDate = new Date(starts);
	const regStartDate = new Date(registration_starts);
	const regEndDate = new Date(registration_ends);

	return (
		<div
			className={`flex items-center justify-between gap-x-4 p-3 ${!(idx % 2) && 'bg-grey-800'}`}
			key={event.name}
		>
			<p className=" items-start gap-x-2 text-wrap text-xl font-semibold">
				{event.name}
			</p>
			<div className="flex gap-x-2">
				{regStartDate && regEndDate && (
					<RegistrationChip
						startDate={regStartDate}
						endDate={regEndDate}
						now={new Date()}
					/>
				)}
				<DateChip startDate={startDate} />
			</div>
		</div>
	);
};
