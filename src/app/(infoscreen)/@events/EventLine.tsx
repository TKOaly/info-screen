import OrganizationChip from '@/components/Events/OrganizationChip';
import I18n from '@/components/I18n/I18n';
import { type TKOalyEvent } from '@/server/TKOalyEvents';
import DateChip from '../../../components/Events/DateChip';
import RegistrationChip from './RegistrationChip';

export const EventLine = async ({
	event,
	idx,
}: {
	event: TKOalyEvent;
	idx: number;
}) => {
	const { name, starts, registration_starts, registration_ends, organizer } =
		event;

	const startDate = new Date(starts);
	const regStartDate = new Date(registration_starts);
	const regEndDate = new Date(registration_ends);

	return (
		<div
			className={`flex items-center justify-between gap-x-4 p-3 ${!(idx % 2) && 'bg-grey-800'}`}
			key={name}
		>
			<p className="text-wrap text-xl font-semibold">
				<I18n>{name}</I18n>
			</p>

			<div className="flex flex-wrap-reverse justify-end gap-3">
				{organizer !== null && (
					<OrganizationChip org={organizer.name} />
				)}
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
