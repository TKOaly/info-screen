import { Slide } from '@/components/Carousel';
import { differenceInCalendarDays } from 'date-fns';
import Image from 'next/image';
import { type ReactNode } from 'react';

// Update this when the next KJYR date is announced.
const KJYR_DATE = new Date(2026, 9, 23);
const ATK_YTP_MONTH_INDEX = 9;
const ATK_YTP_DAY = 14;
const ATK_YTP_OPACITY_WINDOW_DAYS = 365;
const ATK_YTP_MIN_OPACITY = 0.06;
const ATK_YTP_MAX_OPACITY = 0.72;
const tjMathMl =
	'<math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><msub><mi>tj</mi><mi>kjyr</mi></msub><mo>&#x2208;</mo><mo>{</mo><mi>n</mi><mo>:</mo><mi>n</mi><mo>&#x2208;</mo><mi mathvariant="double-struck">R</mi><mo>}</mo></math>';
const cabinMathMl =
	'<math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mi>n</mi><mo>+</mo><mn>1</mn></math>';

const getKjyrJokes = (kjyrDays: number): ReactNode[] => [
	<>Vita sun botti on rikki</>,
	<>Miks tää laiva keinuu jo</>,
	<code key="tj-command">/tj</code>,
	<span key="tj-math" dangerouslySetInnerHTML={{ __html: tjMathMl }} />,
	<>Tahtoisin ginitonicin...</>,
	<>Kimmo taxfreen edessä</>,
	<>Teinilaulu kannella</>,
	<>Jokous kannella 15min</>,
	<>Hyttibileet hytissä 2094</>,
	<>I wake up KJYR is one day closer</>,
	<Image
		key="triangle-man"
		src="/triangle.gif"
		width={120}
		height={120}
		alt="kolmiojäbä.gif"
		unoptimized
	/>,
	<div key="loading" className="w-full max-w-sm">
		<div>Ladataan...</div>
		<div className="mt-3 h-6 overflow-hidden rounded bg-sky-950/20">
			<div className="h-full w-[67%] bg-sky-950" />
		</div>
	</div>,
	<>Oho MaO unohtu</>,
	<>Ei omia juomia laivaan</>,
	<>Miks risteilytiimi ei tee mitään</>,
	<>tj ██ aamua</>,
	<>KJYRPylässä tavataan</>,
	<>Days since &quot;koska KJYR&quot;: 0</>,
	<>Miks SatO:sta tehtiin valtio?</>,
	<>Bäska is calling</>,
	<>Max borgir</>,
	<>Millon tää laiva lähtee</>,
	<>Oon terminaalissa mis kaikki muut on?</>,
	<>Kiva tietää näin kolmelta aamuyöstä</>,
	<>Käytäväsitsit kannella 12</>,
	<>Suomen vai Ruotsin aikaa</>,
	<>Tekis maksaa parlevuu</>,
	<>Pakollinen osallistu</>,
	<>Missä bileet</>,
	<>80 80 80 80</>,
	<>Minä asun mordorissa siellä palvon saatanaa...</>,
	<>Juomat lavuaarissa = jääkaappi</>,
	<>Lava pöytä</>,
	<>Miks tää terminaali keinuu</>,
	<>Buffa varattu TKTO:lle</>,
	<>Hävitetään vasaraa ympäristösyistä</>,
	<>Miks Mesta ei oo mestoilla</>,
	<>Niin mikä synop</>,
	<>Moodi yrittää yhä ekstrapoloida KYRIn ajankohtaa</>,
	<>Resonanssi &quot;integroi&quot; mielummin</>,
	<>Tax-Free, Tax-Free, laivalla Kimmon malliin</>,
	<>
		She KJYR on my TJ till I {Math.abs(kjyrDays)} days{' '}
		{kjyrDays >= 0 ? 'to' : 'since'} KJYR
	</>,
	<span key="titta-greentext" className="text-[#789922]">
		&gt; Titta
	</span>,
	<>Kajari takavarikoitiin</>,
	<>Jos joku kysyy nää on Keravan lukion abi haalarit</>,
	<>&quot;Laivalla on paljon nuorisoa&quot;</>,
	<>TKO-älyn fuksiristeily</>,
	<>&quot;fuksi&quot;risteily</>,
	<>
		Hyttiin mahtuu{' '}
		<span dangerouslySetInnerHTML={{ __html: cabinMathMl }} /> ihmistä
	</>,
	<>Koko laiva on anniskelualuetta, tuoppi ei kuulu hintaan</>,
];

const getMorningCount = (target: Date, today = new Date()) =>
	differenceInCalendarDays(target, today);

const getNextYearlyDate = (
	monthIndex: number,
	day: number,
	today = new Date()
) => {
	const thisYear = new Date(today.getFullYear(), monthIndex, day);

	if (getMorningCount(thisYear, today) >= 0) return thisYear;

	return new Date(today.getFullYear() + 1, monthIndex, day);
};

const getKjyrJoke = (tj: number, jokes: ReactNode[]) =>
	jokes[((tj % jokes.length) + jokes.length) % jokes.length];

const getAtkYtpOpacity = (daysUntilEvent: number) => {
	const boundedDays = Math.min(
		Math.max(daysUntilEvent, 0),
		ATK_YTP_OPACITY_WINDOW_DAYS
	);
	const closeness = 1 - boundedDays / ATK_YTP_OPACITY_WINDOW_DAYS;

	return (
		ATK_YTP_MIN_OPACITY +
		(ATK_YTP_MAX_OPACITY - ATK_YTP_MIN_OPACITY) * closeness
	);
};

type CounterProps = {
	label: string;
	value: number;
	background?: ReactNode;
};

const Counter = ({ label, value, background }: CounterProps) => (
	<div className="relative flex min-h-0 flex-col items-center justify-center gap-2 overflow-hidden border-t border-cyan-100/20 px-6 text-center first:border-t-0">
		{background && (
			<div className="pointer-events-none absolute inset-0 z-0">
				{background}
			</div>
		)}
		<div className="relative z-10 text-3xl font-black uppercase text-cyan-100">
			{label}
		</div>
		<div className="relative z-10 flex items-baseline justify-center gap-3">
			<span className="text-8xl font-black leading-none text-white">
				{value}
			</span>
			<span className="text-3xl font-bold text-cyan-100">aamua</span>
		</div>
	</div>
);

const TJCounter = () => {
	const today = new Date();
	const kjyrTJ = getMorningCount(KJYR_DATE, today);
	const kjyrJokes = getKjyrJokes(kjyrTJ);
	const atkYtpTJ = getMorningCount(
		getNextYearlyDate(ATK_YTP_MONTH_INDEX, ATK_YTP_DAY, today),
		today
	);
	const atkYtpOpacity = getAtkYtpOpacity(atkYtpTJ);
	const vappuTJ = getMorningCount(getNextYearlyDate(4, 1, today), today);

	return (
		<Slide className="bg-teal-900 text-white">
			<div className="flex size-full min-h-0 flex-col">
				<section className="relative flex min-h-0 shrink-0 grow-0 basis-5/12 flex-col items-center justify-center bg-sky-300 px-6 py-5 text-center text-sky-950">
					<h2 className="text-4xl font-black">Tänään Jäljellä</h2>
					<div className="mt-2 flex max-w-xl flex-col items-center justify-center gap-3">
						{kjyrTJ >= 0 && (
							<div className="flex items-baseline justify-center gap-3">
								<span className="text-4xl font-black uppercase">
									KJYR
								</span>
								<span className="text-8xl font-black leading-none">
									{kjyrTJ}
								</span>
								<span className="text-3xl font-bold">
									aamua
								</span>
							</div>
						)}
						{kjyrTJ < 0 && (
							<span className="text-4xl font-black uppercase">
								KJYR
							</span>
						)}
						<div className="text-3xl font-black leading-tight">
							{getKjyrJoke(kjyrTJ, kjyrJokes)}
						</div>
					</div>
					<svg
						className="tjcounter-waves"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 24 150 28"
						preserveAspectRatio="none"
						shapeRendering="auto"
						aria-hidden="true"
					>
						<defs>
							<path
								id="tjcounter-gentle-wave"
								d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
							/>
						</defs>
						<g className="tjcounter-wave-parallax">
							<use
								href="#tjcounter-gentle-wave"
								x="48"
								y="7"
								fill="rgba(125, 211, 252, 0.7)"
							/>
							<use
								href="#tjcounter-gentle-wave"
								x="48"
								y="5"
								fill="rgba(20, 184, 166, 0.6)"
							/>
							<use
								href="#tjcounter-gentle-wave"
								x="48"
								y="3"
								fill="rgba(15, 118, 110, 0.75)"
							/>
							<use
								href="#tjcounter-gentle-wave"
								x="48"
								y="0"
								fill="rgb(17, 94, 89)"
							/>
						</g>
					</svg>
				</section>
				<section className="grid min-h-0 shrink-0 grow-0 basis-7/12 grid-rows-2 bg-teal-800">
					<Counter label="Vappu" value={vappuTJ} />
					<Counter
						label="ATK-YTP"
						value={atkYtpTJ}
						background={
							<Image
								src="/kolmio.gif"
								alt=""
								fill
								aria-hidden="true"
								className="object-contain"
								style={{ opacity: atkYtpOpacity }}
								unoptimized
							/>
						}
					/>
				</section>
			</div>
		</Slide>
	);
};

export default TJCounter;
