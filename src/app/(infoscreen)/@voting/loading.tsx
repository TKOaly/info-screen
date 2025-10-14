import { Slide } from '@/components/Carousel';
import { CommonVotingInfo } from '@/components/Voting/CommonVotingInfo';

const VoteLoading = () => {
	return (
		<Slide className="bg-cyan-900">
			<div className="flex min-h-full min-w-full flex-col gap-y-8 p-4">
				<CommonVotingInfo />
			</div>
		</Slide>
	);
};

export default VoteLoading;
