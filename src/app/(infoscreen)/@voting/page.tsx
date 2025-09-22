import { Slide } from '@/components/Carousel';
import I18n from '@/components/I18n/I18n';

import Image from 'next/image';
import voteSvg from '/public/vote.svg';

const VoteSlide = async () => {
	// FIXME: Use actual values from API
	const votePercentage = 0.4;
	const topVotePercentage = 0.6;

	return (
		<Slide
			// fullWidth ( slides take up half the screen by default )
			className="bg-cyan-900"
		>
			<div className="flex min-h-full min-w-full flex-col gap-y-8 p-4">
				<h3 className="self-center text-3xl font-bold">
					<I18n>
						HYYn Edustajistovaalit // Student Union RepCo Elections
					</I18n>
				</h3>

				<div className="mb-auto mt-auto flex flex-col self-center text-center">
					<p className="text-2xl">
						<I18n>
							Äänestä HYYn edustajistovaaleissa 15.-22.10.! //
							Vote in HYY Representative Council elections between
							15.-22.10.
						</I18n>
					</p>

					<p className="text-xl">
						<I18n>
							Saat ilmaisen pullan ja kahvin, kun äänestät! // Get
							a free bun and coffee when you vote!
						</I18n>
					</p>

					<p className="mt-8 self-center text-5xl">
						👉 <span className="underline">vaalit.hyy.fi</span> 👈
					</p>

					<Image
						alt="vaalit.hyy.fi QR code"
						className="mt-12 self-center"
						src={voteSvg}
					/>
				</div>

				<div className="mb-16 mt-auto flex w-full flex-col gap-y-2">
					<p className="text-3xl">
						<I18n>Äänestysprosentti // Vote percentage</I18n>
					</p>
					<div className="relative h-8 w-full rounded-sm bg-white">
						<div
							className="absolute h-full rounded-sm bg-orange-600"
							style={{
								width: `${(topVotePercentage ?? 0) * 100}%`,
							}}
						>
							<p className="absolute -right-10 top-1/2 -translate-y-1/2 whitespace-nowrap font-bold text-orange-600">
								{(topVotePercentage ?? 0) * 100} %
							</p>
						</div>

						<div
							className="absolute h-full rounded-sm bg-green-600"
							style={{
								width: `${(votePercentage ?? 0) * 100}%`,
							}}
						>
							<p className="absolute right-2 top-1/2 -translate-y-1/2 whitespace-nowrap font-bold text-white">
								{(votePercentage ?? 0) * 100} %
							</p>
						</div>
					</div>
					<div>
						<p className="flex items-center gap-2 text-xl">
							<span className="inline-block h-4 w-4 rounded-full bg-orange-600" />
							<I18n>
								Paras tiedekunta (Lääketieteellinen) // Best
								Faculty (Medicine)
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
