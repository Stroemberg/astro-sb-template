import { useStoryblokApi } from '@storyblok/astro'

export async function getLinks() {
  const storyblokApi = useStoryblokApi()
  try {
    const links = await storyblokApi.getAll('cdn/links', {
      version: import.meta.env.DEV ? 'draft' : 'published',
    })
    return links
  } catch (error) {
    console.error(`Error fetching links:`, error)
    return null
  }
}