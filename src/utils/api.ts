import { useStoryblokApi } from '@storyblok/astro';

// Since this function is only used in production and with static builds we only fetch published content
export async function getLinks() {
	const storyblokApi = useStoryblokApi();
	try {
		const links = await storyblokApi.getAll('cdn/links', {
			version: 'published',
		});
		return links;
	} catch (error) {
		console.error(`Error fetching links:`, error);
		return null;
	}
}
