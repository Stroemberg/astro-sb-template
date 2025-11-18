import { useStoryblokApi } from '@storyblok/astro'

export async function getLinks() {
  const storyblokApi = useStoryblokApi()
  try {
    const links = await storyblokApi.getAll('cdn/links', {
        //version: isPreview() ? 'draft' : 'published',
      version: 'draft'
    })
    return links
  } catch (error) {
    console.error(`Error fetching links:`, error)
    return null
  }
}