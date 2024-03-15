import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import theme from '../config/theme';
import './globals.css';

// Client-side cache, shared for the whole session of the user in the browser.
export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<>
				<Head>
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
					/>
				</Head>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</>
		);
	}
}
