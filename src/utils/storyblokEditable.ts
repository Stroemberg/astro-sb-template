import {
	storyblokEditable as _storyblokEditable,
	type SbBlokData,
} from '@storyblok/astro';

export function storyblokEditable<T extends Record<string, any>>(
	blok: T,
): Record<string, any> {
	return _storyblokEditable(blok as unknown as SbBlokData);
}
