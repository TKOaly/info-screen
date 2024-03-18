/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				'spin-slow': 'spin 10s linear infinite',
			},
		},
	},
	plugins: [],
};
