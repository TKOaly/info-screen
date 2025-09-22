'use client';

import { Slide } from '@/components/Carousel';

const VoteError = async () => {
	return (
		<Slide className="bg-cyan-900">
			<div className="flex min-h-full min-w-full flex-col gap-y-8 p-4">
				<h3 className="self-center text-3xl font-bold">
					HYYn Edustajistovaalit
				</h3>
				<h3 className="self-center text-2xl">
					Student Union RepCo Elections
				</h3>

				<div className="mt-14 flex flex-col self-center text-center">
					<p className="text-2xl">
						Äänestä HYYn edustajistovaaleissa 15.-22.10.!
					</p>
					<p>
						Vote in HYY Representative Council elections between
						15.-22.10.
					</p>

					<p className="text-xl">
						Saat ilmaisen pullan ja kahvin, kun äänestät!
					</p>
					<p>Get a free bun and coffee when you vote!</p>

					<p className="mt-8 self-center text-5xl">
						👉 <span className="underline">vaalit.hyy.fi</span> 👈
					</p>
				</div>
			</div>
		</Slide>
	);
};

export default VoteError;
