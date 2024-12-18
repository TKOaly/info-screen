import { Slide } from '@/components/Carousel';
import Clock from '@/components/Clock';
import { getTransitData } from '@/server/transit';
import { BusFront } from 'lucide-react';

export const dynamic = 'force-dynamic'; // No idea how to stop transit api fetch during CI build

const Transit = async () => {
	const transitData = await getTransitData();
	let stoptimes = [];
	for (const stop of transitData.stops) {
		const now = Date.now();
		for (const stoptime of stop.stoptimesWithoutPatterns) {
			const arrival = new Date(
				(stoptime.serviceDay + stoptime.realtimeArrival) * 1000
			);
			if (arrival.getTime() - now < 120 * 1000)
				// Don't show if less than 2 minutes
				continue;
			let minutesUntil;
			if (arrival.getTime() - now < 1000 * 60 * 15) {
				minutesUntil =
					Math.floor((arrival.getTime() - now) / 1000 / 60) + ' min';
			}

			stoptimes.push({
				el: (
					<>
						<div className="flex w-1/4">
							<p
								className={
									'rounded-lg ' +
									(stoptime.trip.route.type == 701
										? 'bg-sky-800'
										: 'bg-green-800') +
									' px-2'
								}
							>
								{stoptime.trip.routeShortName}
							</p>
						</div>
						<div className="flex w-full justify-between">
							<p className="text-left text-black">
								{stoptime.trip.tripHeadsign}
							</p>
							<p
								className={
									'font-medium ' +
									(stoptime.realtime
										? 'text-green-hsl_realtime'
										: 'text-black')
								}
							>
								{minutesUntil}{' '}
								{arrival.getHours() +
									':' +
									arrival
										.getMinutes()
										.toString()
										.padStart(2, '0')}
							</p>
						</div>
					</>
				),
				num: stoptime.trip.routeShortName,
				arrival: arrival,
				gtfsId: stop.gtfsId,
			});
		}
	}
	stoptimes = stoptimes.sort((a, b) => {
		const arrival_diff =
			Math.floor(a.arrival.getTime() / 1000 / 60) -
			Math.floor(b.arrival.getTime() / 1000 / 60);
		if (arrival_diff != 0) return arrival_diff;
		return a.num.localeCompare(b.num);
	});
	const rightStoptimes = stoptimes
		.filter((x) => ['HSL:1240134', 'HSL:1240133'].includes(x.gtfsId))
		.map((x) => (
			<>
				<div className="border-3 flex w-full justify-between bg-white p-3">
					{x.el}
				</div>
			</>
		));
	const leftStoptimes = stoptimes.map((x) => (
		<>
			<div className="border-3 flex w-1/2 justify-between bg-white p-3">
				{x.el}
			</div>
		</>
	));
	return (
		<Slide fullWidth className="bg-blue-hsl font-m_plus_rounded">
			<div className="flex items-center gap-x-4 bg-sky-700 p-4 pb-0">
				<BusFront width={64} height={64} strokeWidth={1.5} />
				<div className="h-full w-[10px] border-x-[3px]"></div>
				<h2 className="text-4xl font-bold leading-8 tracking-tight">
					HSL
					<br />
					<span className="font-normal">HRT</span>
				</h2>
				<div className="rounded-lg bg-white text-5xl font-bold text-black">
					<Clock></Clock>
				</div>
			</div>
			<div className="flex h-full min-h-0 min-w-full justify-between divide-x-2 overflow-hidden text-3xl font-bold">
				<div className="flex size-full w-2/3 flex-col flex-wrap">
					<div className="flex w-1/2 justify-between bg-sky-700 p-3">
						<p>Kumpulan kampus</p>
					</div>
					{leftStoptimes}
				</div>
				<div className="flex size-full w-1/3 flex-col flex-wrap">
					<div className="flex w-full justify-between bg-sky-700 p-3">
						<p>A.I. Virtasen aukio</p>
					</div>
					{rightStoptimes}
				</div>
			</div>
		</Slide>
	);
};

export default Transit;
