import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import React from 'react';
import { merge } from '../lib/utils';
import './globals.css';

export const metadata: Metadata = {
	title: 'Infoscreen',
	description: 'TKO-äly ry Infoscreen',
};

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fi">
			<body
				className={merge(
					'h-screen overflow-hidden font-sans antialiased',
					fontSans.variable
				)}
			>
				{children}
			</body>
		</html>
	);
}
