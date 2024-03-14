import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import theme from '../config/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from 'config/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { globalStyles } from '../shared/styles';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
export default class MyApp extends App {
	render() {
		const {
			Component,
			pageProps,
			emotionCache = clientSideEmotionCache,
		} = this.props;

		return (
			<CacheProvider value={emotionCache}>
				<Head>
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
					/>
				</Head>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					{globalStyles}
					<Component {...pageProps} />
				</ThemeProvider>
			</CacheProvider>
		);
	}
}
