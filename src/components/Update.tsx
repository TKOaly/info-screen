'use client';

import { getServerVersion } from '@/server/version';
import { useEffect } from 'react';

const VERSION_CHECK_INTERVAL = 1000 * 60 * 5;

/**
 * Hard reloads the page when the reported server version changes and at 1 minute past midnight.
 */
export const Update = ({ initialVersion }: { initialVersion: string }) => {
	/** Update the page when a new version is available */
	useEffect(() => {
		if (!initialVersion) {
			console.error('No initial version provided to Update component');
			return;
		}

		console.log(`Initial server version '${initialVersion}'`);

		const interval = setInterval(async () => {
			const sha = await getServerVersion();

			if (sha && sha !== initialVersion) {
				console.log(
					`New version '${sha}' (current '${initialVersion}') detected, reloading page`
				);
				window.location.reload();
			}
		}, VERSION_CHECK_INTERVAL);

		return () => clearInterval(interval);
	}, []);

	/** Reload the page at 1 minute past midnight in local TZ */
	useEffect(() => {
		const now = new Date();
		const hoursUntilMidnight = 24 - now.getHours();
		const minutesUntilHour = 60 - now.getMinutes();

		// We want to reload at 00:01, so we need to add 1 minute
		const minutesToReload = hoursUntilMidnight * 60 + minutesUntilHour + 1;

		const timeout = setTimeout(
			() => {
				console.log('Reloading page at 00:01');
				window.location.reload();
			},
			minutesToReload * 60 * 1000
		);

		return () => clearTimeout(timeout);
	}, []);

	return null;
};
