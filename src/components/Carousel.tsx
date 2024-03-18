'use client';

import { merge } from '@/lib/utils';
import { type EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { Play } from 'lucide-react';
import React, { useEffect } from 'react';

type CarouselProps = {
	delay?: number;
	children: SlideElement[];
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
			// Makes sure full slides are not shown only partially
			slidesToScroll: 'auto',
			// Makes sure off screen slides are not counted if using emblaApi.slidesInView()
			inViewThreshold: 0.1,
			...rest,
		},
		// Autoplay only if slides are over a page long in total
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
			{/* Carousel */}
			<div
				className="min-w-full flex-auto overflow-hidden"
				ref={emblaRef}
			>
				<div className={`mx-6 -mr-0 flex h-full py-6`}>{children}</div>
			</div>
			{/* Continue autoplay button */}
			<div
				className={`${autoplay ? 'invisible' : 'visible'} absolute bottom-8 right-8 z-50 rounded bg-white/0 p-2 hover:bg-white/30`}
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

export type SlideElement = React.ReactElement<SlideProps>;

// Slide component to be placed in the Carousel
// Can be either full or half width
export const Slide = ({
	full = false, // Either full or half, not both
	half = !full, // Default to half
	className,
	children,
}: SlideProps) => {
	return (
		// Handles slide width and vertical gap
		<div
			className={`flex shrink-0 grow-0 ${full && !half ? 'basis-full' : 'basis-1/2'} pr-6`}
		>
			{/* Makes sure a 1px line is not left at the sides at the end of the slide animation */}
			<div className="flex flex-auto p-0.5">
				{/* Colored slide */}
				<div
					className={merge(
						'flex p-4 min-h-0 min-w-full bg-grey-800',
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
