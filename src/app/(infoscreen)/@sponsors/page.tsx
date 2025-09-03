'use client';

import { Slide } from '@/components/Carousel';
import { getSponsorData, type SponsorData } from '@/server/sponsors';
import { useEffect, useState } from 'react';

const Sponsors = () => {
	const [sponsors, setSponsors] = useState<SponsorData[] | undefined>(
		undefined
	);

	useEffect(() => {
		getSponsorData().then((data) => {
			setSponsors(data);
		}).catch(err => console.error("failed to update sponsors: ", err));
	}, [setSponsors]);

	return (
		<Slide className="bg-white">
			<h1 className="text-center text-[3em] text-black">
				Yhteistyökumppanit
			</h1>
			<div className="max-w-m relative flex flex-wrap items-center justify-evenly">
				{sponsors?.filter((sponsor) => sponsor.logoUrl).map((sponsor) => (
					<img
						key={sponsor.logoUrl}
						className="aspect-[3/2] w-[15em] object-contain"
						src={sponsor.logoUrl}
					/>
				))}
			</div>
		</Slide>
	);
};

export default Sponsors;
