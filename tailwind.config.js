const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			grey: colors.stone,
			red: colors.red,
			blue: colors.blue,
			green: colors.green,
			sky: colors.sky,
			purple: colors.purple,
			emerald: colors.emerald,
			indigo: colors.indigo,
			yellow: { ...colors.yellow, tkoaly: '#fff500' },
		},
		extend: {
			animation: {
				'spin-slow': 'spin 10s linear infinite',
			},
		},
	},
	plugins: [],
};
