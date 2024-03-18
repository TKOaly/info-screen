'use server';

import { GET } from './wrappers';

const RESULTS = 'http://vaalitulos.hyy.fi/2022/votes_by_faculty.json';

type ResultsByFaculty = {
	children: {
		faculties: {
			name: string;
			percentage: number;
		}[];
	};
	total: {
		percentage: number;
	};
};

export const getVotingActivity = async () => {
	const data = await GET<ResultsByFaculty>(RESULTS, {
		next: {
			tags: ['voting-activity'],
			revalidate: 15 * 60,
		},
	});
	const matlu = data.children.faculties.find(
		(obj) =>
			obj && obj.name && obj.name === 'Matemaattis-luonnontieteellinen'
	);
	return {
		faculty: matlu?.percentage,
		total: data.total.percentage,
	};
};
