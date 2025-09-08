'use client';

import { Slide } from '@/components/Carousel';
import Logo from '@/components/Logo';
import Image from 'next/image';
import { type ReactNode, useEffect, useState } from 'react';

type AdType = {
	from?: Date;
	until: Date;
} & ({ url: string; component?: ReactNode } | { component: ReactNode });

const ads: AdType[] = [
	{ url: '/fuksiaiset.png', until: new Date(2024, 8, 29) },
	{ url: '/atkytp.png', until: new Date(2024, 9, 15) },
	{
		url: '/potentiaali.png',
		until: new Date(2024, 10, 8),
	},
];

const Ad = () => {
	const [ad, setAd] = useState<AdType | undefined>(undefined);

	useEffect(() => {
		const getAd = () => {
			const validAds = ads.filter(
				(ad) =>
					ad.until > new Date() && (!ad.from || ad.from < new Date())
			);

			setAd(validAds[new Date().getMinutes() % validAds.length]);
		};

		getAd();

		const interval = setInterval(() => getAd(), 60 * 1000);
		return () => clearInterval(interval);
	}, [setAd]);

	// Fallback to spinning logo if no valid ads are available
	if (ads.length === 0 || !ad)
		return (
			<Slide className="items-center justify-center bg-black text-yellow-400">
				<Logo />
			</Slide>
		);

	return (
		<Slide>
			<div className="relative size-full">
				{'url' in ad && (
					<Image
						fill
						className="object-cover"
						src={ad.url}
						alt={'Ad picture'}
					/>
				)}
				{'component' in ad && ad.component}
			</div>
		</Slide>
	);
};

export default Ad;
