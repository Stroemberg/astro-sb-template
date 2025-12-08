import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';

import tailwindcss from '@tailwindcss/vite';

const env = loadEnv(import.meta.env.MODE, process.cwd(), '');
const { STORYBLOK_DELIVERY_API_TOKEN, STORYBLOK_PUBLISHED_TOKEN } = env;

const enableLivePreview =
	import.meta.env.DEV || env.ENABLE_LIVE_PREVIEW === 'true';

export default defineConfig({
	integrations: [
		storyblok({
			accessToken: enableLivePreview
				? STORYBLOK_DELIVERY_API_TOKEN
				: STORYBLOK_PUBLISHED_TOKEN,
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
			livePreview: enableLivePreview,
			bridge: enableLivePreview,
		}),
	],
	output: enableLivePreview ? 'static' : 'server',
	vite: {
		plugins: [import.meta.env.DEV ? mkcert() : undefined, tailwindcss()].filter(
			Boolean,
		),
	},
});
