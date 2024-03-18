import { getVotingActivity } from '@/server/repcoVoteService';
import { isBefore } from 'date-fns';
import TickingChip from './Events/TickingChip';

const VotePercentage = async () => {
	const data = await getVotingActivity();

	const votingEnds = new Date('2022-11-02T20:00:00');

	if (!isBefore(new Date(), votingEnds)) return null;

	return (
		<div className="absolute bottom-4 left-4 flex w-5/12 flex-col items-center border-4  border-yellow-tkoaly bg-grey-900 p-4">
			<TickingChip
				end={votingEnds}
				className="absolute left-4 bg-yellow-tkoaly text-black"
			/>
			<h2 className="text-5xl">Vote: vaalit.hyy.fi</h2>
			<h3 className="text-4xl">31.10.-2.11.</h3>
			<div className="flex gap-x-16 text-center">
				<div>
					<p className="text-lg">Total voter turnout</p>{' '}
					<p className="text-lg">{data?.total}%</p>
				</div>
				<div>
					<p className="text-lg">Matlu voter turnout</p>{' '}
					<p className="text-lg">{data?.faculty}%</p>
				</div>
			</div>
		</div>
	);
};

export default VotePercentage;
