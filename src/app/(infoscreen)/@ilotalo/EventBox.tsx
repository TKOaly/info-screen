import OrganizationChip from '@/components/Events/OrganizationChip';
import { IlotaloEvent } from '@/server/ilotaloEvents';
import DateChip from '../../../components/Events/DateChip';

export const EventBox = async ({
	event,
}: {
	event: IlotaloEvent;
	idx: number;
}) => {
	const { starts, organization } = event;
	const startDate = new Date(starts);

	return (
		<div
			className={`flex flex-col justify-between gap-2 rounded-2xl bg-black/10 p-3 pt-2`}
			key={event.name}
		>
			<p className="text-wrap text-xl font-semibold">{event.name}</p>
			<div className="flex flex-wrap justify-end gap-2">
				<OrganizationChip org={organization} truncate={16} />
				<DateChip
					startDate={startDate}
					className="bg-org-matlu-primary text-black"
				/>
			</div>
		</div>
	);
};
