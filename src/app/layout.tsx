import { getServerVersion } from '@/server/version';
import { Provider } from 'jotai';
import type { Metadata } from 'next';
import React from 'react';
import { merge } from '../lib/utils';
import { LanguageInterval } from './LanguageInterval';
import { RefetchIntervals } from './RefetchIntervals';
import { Update } from './Update';
import fonts from './fonts';
import './globals.css';

export const metadata: Metadata = {
	title: 'Infoscreen',
	description: 'TKO-äly ry Infoscreen',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const initialVersion = await getServerVersion();

	return (
		<html lang="en">
			<body
				className={merge(
					Object.values(fonts).join(' '),
					'h-screen overflow-hidden font-gabarito antialiased'
				)}
			>
				<Provider>
					{children}
					<LanguageInterval />
					<RefetchIntervals />
					<Update initialVersion={initialVersion} />
				</Provider>
			</body>
		</html>
	);
}
