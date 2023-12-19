import { browser } from '$app/environment';
import type { SongRepository } from './SongRepository';

export type AudioInterface = HTMLAudioElement;

export function createAudio(songRepository: SongRepository): AudioInterface {
	if (!browser) {
		return {
			addEventListener: () => {},
			removeEventListener: () => {}
		} as unknown as HTMLAudioElement;
	}

	const element = new Audio();
	element.id = `${songRepository.name}-audio`;
	document.body.appendChild(element);

	return element;
}
