'use client';

import { Slide } from '@/components/Carousel';
import { Temporal } from 'temporal-polyfill';
import { EVENTS, type IEvent } from './events';

const Countdown = (event: IEvent) => {
	const formatter = new Intl.RelativeTimeFormat('fi', { style: 'long' });

	const targetDate = Temporal.PlainDate.from(event.ends.toString());
	const today = Temporal.Now.plainDateISO();

	const diffInDays = today.until(targetDate).days;

	return (
		<div className="flex items-center justify-between rounded-xl bg-black/10 px-12 py-6">
			<p className="text-5xl font-bold">{event.name}</p>
			<p className="text-3xl">
				{diffInDays === 0
					? 'Tänään'
					: formatter.format(diffInDays, 'days')}
			</p>
		</div>
	);
};

const Countdowns = () => {
	return (
		<Slide className="bg-org-matlu-primary">
			<h1 className="text-center text-[3em] font-bold text-grey-800">
				<span className="opacity-5">🐳</span>
				Tulossa
				<span className="opacity-5">💦</span>
			</h1>
			<div className="max-w-m relative flex flex-col gap-4 overflow-y-auto px-4 pb-6">
				{EVENTS.filter(
					(event) =>
						Temporal.PlainDate.compare(
							event.ends,
							Temporal.Now.plainDateISO()
						) >= 0
				).map((event) => (
					<Countdown key={event.name} {...event} />
				))}
			</div>
		</Slide>
	);
};

export default Countdowns;
