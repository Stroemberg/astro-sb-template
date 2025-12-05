import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';

import tailwindcss from '@tailwindcss/vite';

const env = loadEnv(import.meta.env.MODE, process.cwd(), '');
const { STORYBLOK_DELIVERY_API_TOKEN } = env;

export default defineConfig({
	integrations: [
		storyblok({
			accessToken: STORYBLOK_DELIVERY_API_TOKEN,
			apiOptions: {
				/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
				region: 'eu',
				/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
			},
			components: {
				page: 'storyblok/Page',
				rich_text: 'storyblok/RichText',
				link: 'storyblok/Link',
			},
			enableFallbackComponent: true,
			livePreview: import.meta.env.DEV,
			bridge: import.meta.env.DEV,
		}),
	],
	output: import.meta.env.PROD ? 'static' : 'server',
	vite: {
		plugins: [import.meta.env.DEV ? mkcert() : undefined, tailwindcss()].filter(
			Boolean,
		),
	},
});
