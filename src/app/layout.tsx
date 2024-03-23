import type { Metadata } from 'next';
import React from 'react';
import { merge } from '../lib/utils';
import fonts from './fonts';
import './globals.css';

export const metadata: Metadata = {
	title: 'Infoscreen',
	description: 'TKO-äly ry Infoscreen',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={merge(
					Object.values(fonts).join(' '),
					'h-screen overflow-hidden font-gabarito antialiased'
				)}
			>
				{children}
			</body>
		</html>
	);
}
