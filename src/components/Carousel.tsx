'use client';

import { merge } from '@/lib/utils';
import { type EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { Play } from 'lucide-react';
import React, { useCallback, useEffect } from 'react';

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
		.map((child) => (child.props.fullWidth ? 2 : 1))
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

	const resumeAutoplay = useCallback(() => {
		if (emblaApi) emblaApi.plugins().autoplay?.play();
	}, [emblaApi]);

	useEffect(() => {
		if (autoplay) return;

		// Resume autoplay after 5 minutes of inactivity
		const autoplayTimeout = setTimeout(resumeAutoplay, 1000 * 60 * 5);

		return () => clearTimeout(autoplayTimeout);
	}, [autoplay, resumeAutoplay]);

	// Register keyboard event listener to document on mount
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight') {
				emblaApi?.scrollNext();
				e.preventDefault();
			}
			if (e.key === 'ArrowLeft') {
				emblaApi?.scrollPrev();
				e.preventDefault();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
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
				onClick={resumeAutoplay}
			>
				<Play width={16} height={16} color="white" />
			</div>
		</>
	);
};

type SlideProps = {
	fullWidth?: boolean;
	className?: string;
	children: React.ReactNode;
};

export type SlideElement = React.ReactElement<SlideProps>;

// Slide component to be placed in the Carousel
export const Slide = ({
	fullWidth = false, // Default half
	className,
	children,
}: SlideProps) => {
	return (
		// Handles slide width and vertical gap
		<div
			className={`flex shrink-0 grow-0 basis-full ${!fullWidth && 'lg:basis-1/2'} pr-6`}
			// This is appended by Embla anyways to handle slide animations, avoid hydration mismatch
			style={{ transform: `translate3d(0px, 0px, 0px)` }}
		>
			{/* Makes sure a 1px line is not left at the sides at the end of the slide animation */}
			<div className="flex flex-auto p-0.5">
				{/* Colored slide */}
				<div
					className={merge(
						'flex flex-col min-h-0 min-w-full bg-grey-800',
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
