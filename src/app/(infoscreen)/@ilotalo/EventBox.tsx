import OrganizationChip from '@/components/Events/OrganizationChip';
import I18n from '@/components/I18n/I18n';
import { IlotaloEvent, Room } from '@/server/ilotaloEvents';
import DateChip from '../../../components/Events/DateChip';

const enRoomMapping: Record<Room, string> = {
	Kerhotila: 'Clubroom',
	Kokoushuone: 'Meeting room',
	'Christina Regina': 'Klusteri',
	Oleskelutila: 'Lounge',
};

const fiRoomMapping: Record<Room, string> = {
	Kerhotila: 'Kerhotila',
	Kokoushuone: 'Kokoushuone',
	'Christina Regina': 'Klusteri',
	Oleskelutila: 'Oleskelutila',
};

export const EventBox = async ({ event }: { event: IlotaloEvent }) => {
	const { name, starts, organization, room, isClosed } = event;
	const startDate = new Date(starts);

	return (
		<div className="relative text-clip">
			{isClosed && (
				<div className="absolute right-0 top-0 rounded-es-xl rounded-se-lg bg-red-600 px-2 text-base font-semibold text-grey-100">
					<p className="-mt-1">
						<I18n>
							{fiRoomMapping[room]} varattu //{' '}
							{enRoomMapping[room]} reservation
						</I18n>
					</p>
				</div>
			)}
			<div
				className={`flex size-full flex-col justify-between gap-2 rounded-2xl bg-black/10 p-3 pt-2 ${isClosed && 'pt-4 ring-4 ring-red-600'}`}
				key={name}
			>
				<p className="text-wrap text-xl font-semibold">{name}</p>

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
