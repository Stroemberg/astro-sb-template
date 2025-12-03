import eslintPluginAstro from 'eslint-plugin-astro';

export default [
	...eslintPluginAstro.configs.recommended,
	{
		rules: {
			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/consistent-type-imports': 'error',
		},
		files: ['**/*.ts'],
	},
];
