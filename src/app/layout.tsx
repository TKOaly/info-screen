import type { Metadata } from 'next';
import React from 'react';
import { merge } from '../lib/utils';
import fonts from './fonts';
import './globals.css';
import { getServerVersion } from '@/server/version';
import { Update } from '@/components/Update';

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
				{children}
				<Update initialVersion={initialVersion} />
			</body>
		</html>
	);
}
