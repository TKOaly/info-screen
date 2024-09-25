import { Slide } from '@/components/Carousel';
import { BusFront } from 'lucide-react';

// WIP MOCKUP for the transit page

const Transit = async () => {
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
			</div>
			<div className="flex h-full min-h-0 min-w-full justify-between divide-x-2 overflow-hidden text-3xl font-bold">
				<div className="flex size-full flex-col divide-y-2">
					<div className="flex w-full justify-between bg-sky-700 p-3">
						<p>Line</p>
						<p>Pohjoiseen / Länteen</p>
						<p>Time</p>
					</div>
					<div className="flex w-full justify-between p-3">
						<p className="rounded-lg bg-sky-800 px-2">56</p>
						<p>Kalasatama</p>
						<p>5 min</p>
					</div>
					<div className="flex w-full justify-between p-3">
						<p className="rounded-lg bg-sky-800 px-2">506</p>
						<p>Viikki</p>
						<p>~12 min</p>
					</div>
					<div className="flex w-full justify-between p-3">
						<p className="rounded-lg bg-emerald-800 px-4">8</p>
						<p>Rautatieasema</p>
						<p>5 min</p>
					</div>
				</div>
				<div className="flex w-full flex-col divide-y-2">
					<div className="flex w-full justify-between bg-sky-700 p-3">
						<p>Line</p>
						<p>Etelään / Itään</p>
						<p>Time</p>
					</div>
					<div className="flex w-full justify-between p-3">
						<p className="rounded-lg bg-sky-800 px-2">56</p>
						<p>Kannelmäki</p>
						<p>5 min</p>
					</div>
					<div className="flex w-full justify-between p-3">
						<p className="rounded-lg bg-sky-800 px-2">506</p>
						<p>Pasila</p>
						<p>~12 min</p>
					</div>
				</div>
			</div>
		</Slide>
	);
};

export default Transit;
