'use server';

import { Slide } from '@/components/Carousel';
import { getLectureReservations } from '@/server/lectures';
import Image from 'next/image';
import { Fragment } from 'react';
import { LectureBox } from './LectureBox';

const Lectures = async () => {
	const lectures = await getLectureReservations();

	if (Object.values(lectures).flat().length === 0) return null;

	return (
		<Slide className="bg-grey-900 pt-3 text-grey-100">
			<div className="flex size-full min-h-0 flex-col items-center justify-start gap-y-4">
				<div className="relative -mt-4 max-h-0 w-full">
					<Image
						className="absolute right-4 top-6"
						src="/orgs/hy.png"
						width={50}
						height={50}
						alt="HY logo"
					/>
				</div>
				<h2 className="z-50 rounded-xl bg-grey-900 px-2 text-4xl font-bold text-grey-100">
					Lectures
				</h2>
				<div className="scrollbar-none -mt-20 flex min-h-0 w-full overflow-y-auto">
					<div className="flex min-h-0 w-full flex-col pt-14">
						{lectures &&
							Object.entries(lectures).map(
								([relativeWeek, lectures]) => {
									if (!lectures || lectures.length === 0)
										return null;
									return (
										<Fragment key={relativeWeek}>
											<h3 className="p-2 text-2xl font-bold">
												{relativeWeek}
											</h3>
											<hr className="w-full" />
											<div className="grid grid-cols-2 gap-4 p-4">
												{lectures.map((lecture) => (
													<LectureBox
														key={lecture.uid}
														lecture={lecture}
													/>
												))}
											</div>
										</Fragment>
									);
								}
							)}
					</div>
				</div>
			</div>
		</Slide>
	);
};

export default Lectures;
