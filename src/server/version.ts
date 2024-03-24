'use server';
const sha = process.env.NEXT_COMMIT_SHA || 'no-version';

export async function getServerVersion() {
	'use server';
	return sha;
}
