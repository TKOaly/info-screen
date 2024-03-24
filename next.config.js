// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	headers: async () => {
		return [
			{
				source: '/public',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=0', // Can be set higher for production
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
