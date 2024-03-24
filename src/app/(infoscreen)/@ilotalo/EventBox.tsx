import OrganizationChip from '@/components/Events/OrganizationChip';
import { IlotaloEvent } from '@/server/ilotaloEvents';
import DateChip from '../../../components/Events/DateChip';

export const EventBox = async ({ event }: { event: IlotaloEvent }) => {
	const { starts, organization } = event;
	const startDate = new Date(starts);

	return (
		<div className="relative text-clip">
			{event.isClosed && (
				<div className="absolute right-0 top-0 rounded-es-xl rounded-se-lg bg-red-600 px-2 text-base font-semibold text-grey-100">
					<p className="-mt-1">Closed reservation</p>
				</div>
			)}
			<div
				className={`flex size-full flex-col justify-between gap-2 rounded-2xl bg-black/10 p-3 pt-2 ${event.isClosed && 'ring-4 ring-red-600'}`}
				key={event.name}
			>
				<p className="text-wrap text-xl font-semibold">{event.name}</p>

				<div className="flex flex-wrap justify-end gap-2">
					<DateChip
						startDate={startDate}
						className="bg-org-matlu-primary text-black"
					/>

					<OrganizationChip
						org={organization.toUpperCase()}
						truncate={16}
					/>
				</div>
			</div>
		</div>
	);
};
