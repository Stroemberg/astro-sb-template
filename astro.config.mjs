import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

const env = loadEnv(import.meta.env.MODE, process.cwd(), '');
const { STORYBLOK_DELIVERY_API_TOKEN, STORYBLOK_PUBLISHED_TOKEN } = env;

const enableLivePreview =
	import.meta.env.DEV || env.STORYBLOK_ENABLE_LIVE_PREVIEW === 'true';

export default defineConfig({
	site: 'https://example.com', // Replace with your production URL
	redirects: {
		// Add your permanent redirects here
		// '/old-page': '/new-page',
		// '/blog/old-post': '/blog/new-post',
		'invalid-path': '/',
	},
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
		sitemap({
			filter: (page) => !page.includes('/404'),
		}),
	],
	output: enableLivePreview ? 'server' : 'static',
	adapter: enableLivePreview ? node({ mode: 'standalone' }) : undefined,
	vite: {
		plugins: [import.meta.env.DEV ? mkcert() : undefined, tailwindcss()].filter(
			Boolean,
		),
	},
});
