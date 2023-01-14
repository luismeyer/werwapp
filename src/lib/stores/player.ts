import { writable } from 'svelte/store';
import { CrossFade, Player, ToneAudioBuffer } from 'tone';

import { browser } from '$app/environment';
import type { Song } from '$lib/song';

export type PlayerStore = {
	fading: boolean;
	paused: boolean;
	currentPhaseSong?: Song;
	nextPhaseSong?: Song;
	crossFade?: CrossFade;
	dayPlayer?: Player;
	nightPlayer?: Player;
	queue: {
		timeout?: NodeJS.Timeout;
		buffer?: ToneAudioBuffer;
		song?: Song;
	};
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
		paused: false,
		crossFade,
		dayPlayer,
		nightPlayer,
		queue: {}
	};
};

export function createPlayerStore() {
	const init: PlayerStore | undefined = browser
		? createInit()
		: { fading: false, paused: false, queue: {} };

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
