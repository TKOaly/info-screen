'use server';

import { Slide } from '@/components/Carousel';
import Image from 'next/image';

const IlotaloEvents = async () => {
	return (
		<Slide className="bg-org-matlu-primary pt-3 text-grey-900">
			<div className="flex size-full min-h-0 flex-col items-center justify-start gap-y-4">
				<div className="relative -mt-4 max-h-0 w-full">
					<Image
						className="absolute right-4 top-6"
						src="/orgs/matlu.png"
						width={100}
						height={100}
						alt="matlu logo"
					/>
				</div>
				<h2 className="z-50 rounded-xl bg-org-matlu-primary px-2 text-4xl font-bold">
					Klusteri
				</h2>
				<div className="scrollbar-none -mt-20 flex min-h-0 w-full overflow-y-auto">
					<div className="flex min-h-0 w-full flex-col pt-14">
						<h2>R.I.P. Matlu-Klusteri<br/>2008&ndash;2026</h2>
					</div>
				</div>
			</div>
		</Slide>
	);
};

export default IlotaloEvents;
