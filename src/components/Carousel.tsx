'use client';

import { merge } from '@/lib/utils';
import { type EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { Play } from 'lucide-react';
import React, { useEffect } from 'react';

type CarouselProps = {
	delay?: number;
	children: React.ReactElement<SlideProps>[];
};

export const Carousel = ({
	children,
	delay = 3000,
	...rest
}: CarouselProps & EmblaOptionsType) => {
	const slidesLength = children
		.map((child) => (child.props.full ? 2 : 1))
		.reduce((a, b) => a + b, 0);

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			align: 'start',
			slidesToScroll: 'auto',
			inViewThreshold: 0.1,
			...rest,
		},
		slidesLength > 2 ? [Autoplay({ delay })] : undefined
	);

	// Show play button when autoplay is stopped
	const [autoplay, setAutoplay] = React.useState(true);
	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.on('autoplay:stop', () => setAutoplay(false));
		emblaApi.on('autoplay:play', () => setAutoplay(true));
	}, [emblaApi]);

	return (
		<>
			<div
				className="overflow-hidden min-h-full min-w-full"
				ref={emblaRef}
			>
				<div className={`flex min-h-full mx-6 -mr-0 py-6`}>
					{children}
				</div>
			</div>
			<div
				className={`${autoplay ? 'invisible' : 'visible'} z-50 absolute bottom-8 right-8 p-2 rounded bg-white bg-opacity-0 hover:bg-opacity-30`}
				onClick={() => {
					if (emblaApi) emblaApi.plugins().autoplay?.play();
				}}
			>
				<Play width={16} height={16} color="white" />
			</div>
		</>
	);
};

type SlideProps = (
	| {
			full?: false;
			half?: true;
	  }
	| {
			full: true;
			half?: false;
	  }
) & {
	className?: string;
	children: React.ReactNode;
};

export const Slide = ({
	full = false, // Either full or half, not both
	half = !full, // Default to half
	className,
	children,
}: SlideProps) => {
	return (
		<div
			className={`flex flex-grow-0 flex-shrink-0 ${full && !half ? 'basis-full' : 'basis-1/2'} pr-6`}
		>
			<div className="flex p-0.5 flex-auto">
				<div
					className={merge(
						'flex p-4 min-h-full min-w-full',
						className,
						'overflow-hidden rounded-2xl'
					)}
				>
					{children}
				</div>
			</div>
		</div>
	);
};
