/* eslint-env node */
module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname,
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'next/core-web-vitals',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
	],
	rules: {
		'@typescript-eslint/array-type': 'off',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/require-await': 'off',
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{
				prefer: 'type-imports',
				fixStyle: 'inline-type-imports',
			},
		],
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
	},
};
