import { Gabarito, Inter, M_PLUS_Rounded_1c, Syne } from 'next/font/google';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

const m_plus_rounded = M_PLUS_Rounded_1c({
	weight: ['400', '500', '700', '800'],
	subsets: ['latin'],
	variable: '--font-m-plus-rounded',
});

const syne = Syne({
	subsets: ['latin'],
	variable: '--font-syne',
});

const gabarito = Gabarito({
	subsets: ['latin'],
	variable: '--font-gabarito',
});

// Adding fonts see https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css

const fonts = {
	inter: inter.variable, // https://fonts.google.com/specimen/Inter+Tight
	m_plus_rounded: m_plus_rounded.variable, // https://fonts.google.com/specimen/M+PLUS+Rounded+1c
	syne: syne.variable, // https://fonts.google.com/specimen/Syne
	gabarito: gabarito.variable, // https://fonts.google.com/specimen/Gabarito
};

export default fonts;
