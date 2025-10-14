import { isBefore } from 'date-fns';
import TickingChip from '../Events/TickingChip';
import I18n from '../I18n/I18n';
import { VotingSvg } from './VotingSvg';

const votingStarts = new Date(2025, 9, 15, 10, 0, 0); // October is month 9 (0-indexed)

export const CommonVotingInfo = () => {
	const today = new Date();
	const votingInFuture = isBefore(today, votingStarts);

	return (
		<>
			<h3 className="self-center text-3xl font-bold">
				<I18n>
					HYYn Edustajistovaalit // Student Union RepCo Elections
				</I18n>
			</h3>

			<div className="mb-auto mt-auto flex flex-col self-center text-center">
				<p className="text-2xl">
					<I18n>
						Äänestä HYYn edustajistovaaleissa 15.-22.10.! // Vote in
						HYY Representative Council elections between 15.-22.10.
					</I18n>
				</p>

				<p className="text-xl">
					<I18n>
						Saat ilmaisen pullan ja kahvin, kun äänestät! // Get a
						free bun and coffee when you vote!
					</I18n>
				</p>

				<p className="mt-8 self-center text-5xl">
					👉 <span className="underline">vaalit.hyy.fi</span> 👈
				</p>

				{votingInFuture ? (
					<TickingChip
						prefix="Vaalit alkavat // Elections start in"
						variant="info"
						className="mt-12 self-center"
						end={votingStarts}
					/>
				) : (
					<VotingSvg />
				)}
			</div>
		</>
	);
};
