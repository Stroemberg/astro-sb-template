import eslintPluginAstro from 'eslint-plugin-astro';

export default [
	...eslintPluginAstro.configs.recommended,
	{
		rules: {
			// Add your custom rules here
		},
	},
];
