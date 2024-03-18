import { type TKOalyEvent } from '@/server/events';
import DateChip from './DateChip';
import RegistrationChip from './RegistrationChip';

export const EventLine = async ({ event }: { event: TKOalyEvent }) => {
	const { starts, registration_starts, registration_ends } = event;

	const startDate = new Date(starts);
	const regStartDate = new Date(registration_starts);
	const regEndDate = new Date(registration_ends);

	return (
		<div
			className="flex max-h-fit min-w-full justify-between"
			key={event.name}
		>
			<p className="items-start gap-x-2 text-wrap text-xl">
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
