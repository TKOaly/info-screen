'use client';

import { Slide } from '@/components/Carousel';
import I18n from '@/components/I18n/I18n';
import { VotingSvg } from '@/components/VotingSvg';

const VoteError = () => {
	return (
		<Slide className="bg-cyan-900">
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

					<VotingSvg />
				</div>
			</div>
		</Slide>
	);
};

export default VoteError;
