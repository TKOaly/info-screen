const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
	safelist: ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'],
	theme: {
		colors: {
			inherit: colors.inherit,
			current: colors.current,
			transparent: colors.transparent,
			black: colors.black,
			white: colors.white,
			grey: colors.stone,
			red: colors.red,
			orange: colors.orange,
			amber: colors.amber,
			yellow: colors.yellow,
			lime: colors.lime,
			green: colors.green,
			emerald: colors.emerald,
			teal: colors.teal,
			cyan: colors.cyan,
			sky: colors.sky,
			blue: colors.blue,
			indigo: colors.indigo,
			violet: colors.violet,
			purple: colors.purple,
			fuchsia: colors.fuchsia,
			pink: colors.pink,
			rose: colors.rose,
		},
		extend: {
			colors: {
				blue: { hsl: '#007AC9' },
				green: { unari: '#155C2C', hsl_realtime: '#46850e' },
				yellow: { tkoaly: '#fff500' },
				org: {
					tkoaly: '#FFF500',
					matlu: {
						primary: '#FCA412',
						secondary: '#09773A',
					},
				},
			},
			animation: {
				'spin-slow': 'spin 10s linear infinite',
			},
			fontFamily: {
				inter: ['var(--font-inter)'],
				sans: ['var(--font-inter)'],
				m_plus_rounded: ['var(--font-m-plus-rounded)'],
				gabarito: ['var(--font-gabarito)'],
			},
		},
	},
	plugins: [],
};
