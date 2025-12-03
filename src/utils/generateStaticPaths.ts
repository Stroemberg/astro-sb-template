import { getLinks } from './api';

export default async function generateStaticPaths() {
	const links = await getLinks();

	if (!links) {
		return [];
	}

	return links
		.filter((link) => !link.is_folder)
		.map((link) => {
			//This slug will be used for fetching data from storyblok
			const slug = link.slug === 'home' ? undefined : link.slug;

			return {
				props: { slug },
				params: {
					slug: slug,
				},
			};
		});
}
