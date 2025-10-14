import { Slide } from '@/components/Carousel';
import I18n from '@/components/I18n/I18n';
import { CommonVotingInfo } from '@/components/Voting/CommonVotingInfo';

import { getVotingActivity } from '@/server/repcoVotes';

const facultyTranslations = {
	'Svenska social- och kommunalhögskolan': 'Swedish School of Social Science',
	Eläinlääketieteellinen: 'Veterinary Medicine',
	Lääketieteellinen: 'Medicine',
	Valtiotieteellinen: 'Social Sciences',
	Oikeustieteellinen: 'Law',
	'Bio- ja ympäristötieteellinen': 'Biosciences and Environmental Sciences',
	'Maatalous-metsätieteellinen': 'Agriculture and Forestry',
	Farmasia: 'Pharmacy',
	'Matemaattis-luonnontieteellinen': 'Science',
	Humanistinen: 'Arts',
	Teologinen: 'Theology',
	Kasvatustieteellinen: 'Educational Sciences',
} as const;

const VoteSlide = async () => {
	const votes = await getVotingActivity();

	if (!votes) return null;

	return (
		<Slide className="bg-cyan-900">
			<div className="flex min-h-full min-w-full flex-col gap-y-8 p-4">
				<CommonVotingInfo />

				<div className="mb-16 mt-auto flex w-full flex-col gap-y-2">
					<p className="text-3xl">
						<I18n>Äänestysprosentti // Vote percentage</I18n>
					</p>
					<div className="relative h-8 w-full rounded-sm bg-white">
						<div
							className="absolute h-full rounded-sm bg-orange-600"
							style={{
								width: `${votes.mostVoted.percentage ?? 0}%`,
							}}
						>
							<p className="absolute -right-16 top-1/2 -translate-y-1/2 whitespace-nowrap font-bold text-orange-600">
								{votes.mostVoted.percentage ?? 0} %
							</p>
						</div>

						<div
							className="absolute h-full rounded-sm bg-green-600"
							style={{
								width: `${votes.matluPercentage ?? 0}%`,
							}}
						>
							<p className="absolute right-2 top-1/2 -translate-y-1/2 whitespace-nowrap font-bold text-white">
								{votes.matluPercentage ?? 0} %
							</p>
						</div>
					</div>
					<div>
						<p className="flex items-center gap-2 text-xl">
							<span className="inline-block h-4 w-4 rounded-full bg-orange-600" />
							<I18n>
								Paras tiedekunta ({votes.mostVoted.name}) //
								Best Faculty (
								{
									facultyTranslations[
										votes.mostVoted
											.name as keyof typeof facultyTranslations
									]
								}
								)
							</I18n>
						</p>
						<p className="flex items-center gap-2 text-xl">
							<span className="inline-block h-4 w-4 rounded-full bg-green-600" />
							<I18n>
								Matemaattis-luonnontieteellinen tiedekunta //
								Faculty of Science
							</I18n>
						</p>
					</div>
				</div>
			</div>
		</Slide>
	);
};

export default VoteSlide;
