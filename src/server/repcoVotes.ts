'use server';

import { revalidateTag } from 'next/cache';
import { GET } from './wrappers';

const ENTRYPOINT = 'http://vaalitulos.hyy.fi/2025/votes_by_faculty.json';

type ResultsByFaculty = {
	children: {
		faculties: {
			name: string;
			percentage: number;
		}[];
		total: {
			percentage: number;
		};
	};
};

const fetchTag = 'voting-activity';

export const getVotingActivity = async () => {
	const data = await GET<ResultsByFaculty>(ENTRYPOINT, {
		next: {
			tags: [fetchTag],
			revalidate: 15 * 60,
		},
	});

	if (!data) {
		return null;
	}

	const matlu = data.children.faculties.find(
		(obj) => obj?.name && obj.name === 'Matemaattis-luonnontieteellinen'
	);

	const mostVoted = data.children.faculties.sort(
		({ percentage: pA }, { percentage: pB }) => pB - pA
	)[0];

	return {
		matluPercentage: matlu?.percentage,
		mostVoted: {
			name: mostVoted?.name,
			percentage: mostVoted?.percentage,
		},
		total: data.children.total.percentage,
	};
};

export const revalidateRepcoVotes = async () => revalidateTag(fetchTag);
