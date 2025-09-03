'use client';

import { Slide } from '@/components/Carousel';
import { getSponsorData, SponsorData } from '@/server/sponsors';
import { useEffect, useState } from 'react';

const Sponsors = () => {
	const [sponsors, setSponsors] = useState<SponsorData[] | undefined>(undefined);

	useEffect(() => {
		getSponsorData().then(data => {
			setSponsors(data)
		})
	}, [setSponsors]);

	return (
		<Slide className="bg-white">
			<h1 className="text-black text-[3em] text-center">Yhteistyökumppanit</h1>
			<div className="flex flex-wrap justify-evenly items-center relative max-w-m">
				{sponsors &&
					sponsors.filter(sponsor => (sponsor.logoUrl)).map(sponsor => (<img className="w-[15em] aspect-[3/2] object-contain"
						src={sponsor.logoUrl!}
					/>))}
			</div>
		</Slide >
	);
};

export default Sponsors;
