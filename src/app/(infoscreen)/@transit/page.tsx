import { Slide } from '@/components/Carousel';
import Clock from '@/components/Clock';
import { getTransitData, type TransitData } from '@/server/transit';
import { BusFront } from 'lucide-react';

export const dynamic = 'force-dynamic'; // No idea how to stop transit api fetch during CI build

const renderStoptimes = (transitData: TransitData): JSX.Element[] => {
	let stoptimes = [];
	const now = Date.now();
	for (const stop of transitData.stops) {
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
				routeNumber: stoptime.trip.routeShortName,
				routeHeadsign: stoptime.trip.tripHeadsign,
				arrival: arrival,
			});
		}
	}
	/* Why such a complex sorting function?
	 * This is an attempt to make the sorting more stable. Arrival times come from the API with second precision and
	 * are very unstable, so different buses with similar arrival times change their order all the time. This would be
	 * inconvenient for the reader. In the UI the arrival times are shown with minute precision, so we can just as well
	 * sort them by minute precision. This hides any unstability in the sub-minute arrival times but still keeps the
	 * arrival minutes in order.
	 * 
	 * The drawback is that now buses with same minute arrivals may randomly change their order based on the order they
	 * come from the API. For this reason the buses are sorted by every visible field to make their order as stable as
	 * possible. */
	stoptimes = stoptimes.sort((a, b) => {
		const clockMinutesDiff =
			Math.floor(a.arrival.getTime() / 1000 / 60) -
			Math.floor(b.arrival.getTime() / 1000 / 60);
		if (clockMinutesDiff !== 0) return clockMinutesDiff;
		const untilMinutesDiff =
			Math.floor((a.arrival.getTime() - now) / 1000 / 60) -
			Math.floor((b.arrival.getTime() - now) / 1000 / 60);
		if (untilMinutesDiff !== 0) return untilMinutesDiff;
		const routeNumberDiff = a.routeNumber.localeCompare(b.routeNumber);
		if (routeNumberDiff !== 0) return routeNumberDiff;
		return a.routeHeadsign.localeCompare(b.routeHeadsign);
	});
	return stoptimes.map((x) => x.el);
};

const Transit = async () => {
	const stoptimes = await Promise.all(
		[
			['HSL:1240134', 'HSL:1240133'],
			[
				'HSL:1240118',
				'HSL:1240103',
				'HSL:1240419',
				'HSL:1240418',
				'HSL:1230109',
				'HSL:1230112',
			],
			['HSL:1210405', 'HSL:1210406'],
		].map(async (x) =>
			renderStoptimes(
				await getTransitData(x).catch((err) => {
					console.error(err);
					return { stops: [] };
				})
			)
		)
	);
	const rightStoptimes = stoptimes[0].map((x) => (
		<>
			<div className="flex w-full justify-between bg-white p-3">{x}</div>
		</>
	));
	const leftStoptimes = stoptimes[1].map((x) => (
		<>
			<div className="flex w-1/2 justify-between bg-white p-3">{x}</div>
		</>
	));
	const thirdStoptimes = stoptimes[2].map((x) => (
		<>
			<div className="flex w-full justify-between bg-white p-3">{x}</div>
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
			<div className="flex h-full min-h-0 min-w-full justify-between overflow-hidden bg-white text-3xl font-bold">
				<div className="flex size-full w-2/3 flex-col flex-wrap">
					<div className="flex w-1/2 justify-between bg-sky-700 p-3">
						<p>Kumpulan kampus</p>
					</div>
					{leftStoptimes}
				</div>
				<div className="flex size-full w-1/3 flex-col">
					<div className="flex h-9/14 w-full flex-col flex-wrap">
						<div className="flex w-full justify-between bg-sky-700 p-3">
							<p>A.I. Virtasen aukio</p>
						</div>
						{rightStoptimes}
					</div>
					<div className="flex h-5/14 w-full flex-col flex-wrap">
						<div className="flex w-full justify-between bg-sky-700 p-3">
							<p>Nylanderinpuisto</p>
						</div>
						{thirdStoptimes}
					</div>
				</div>
			</div>
		</Slide>
	);
};

export default Transit;
