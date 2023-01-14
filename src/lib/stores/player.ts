import { writable } from 'svelte/store';
import { CrossFade, Player } from 'tone';

import type { Song } from '$lib/song';
import { browser } from '$app/environment';

export type PlayerStore = {
	fading: boolean;
	currentSong?: Song;
	nextSong?: Song;
	crossFade?: CrossFade;
	dayPlayer?: Player;
	nightPlayer?: Player;
	queueTimeout?: NodeJS.Timeout;
};

const createInit = (): PlayerStore => {
	const fadeTime = 1;

	const crossFade = new CrossFade({ fade: 1 }).toDestination();

	const dayPlayer = new Player({
		fadeIn: fadeTime,
		fadeOut: fadeTime
	});

	const nightPlayer = new Player({
		fadeIn: fadeTime,
		fadeOut: fadeTime
	});

	// bind day to 0
	dayPlayer.connect(crossFade.a);

	// bind night to 1
	nightPlayer.connect(crossFade.b);

	return {
		fading: false,
		crossFade,
		dayPlayer,
		nightPlayer
	};
};

export function createPlayerStore() {
	const init: PlayerStore | undefined = browser ? createInit() : { fading: false };

	const { subscribe, update } = writable<PlayerStore>(init);

	const updateAction = (newState: Partial<PlayerStore>) => {
		update((currentState) => ({ ...currentState, ...newState }));
	};

	return {
		subscribe,
		update: updateAction
	};
}

export const playerStore = createPlayerStore();
