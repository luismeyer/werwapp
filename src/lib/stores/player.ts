import { get, writable } from 'svelte/store';
import * as Tone from 'tone';

import { browser } from '$app/environment';
import type { Song } from '$lib/song';

export type PlayerStore = {
	fading: boolean;
	paused: boolean;
	currentPhaseSong?: Song;
	nextPhaseSong?: Song;
	crossFade?: Tone.CrossFade;
	dayPlayer?: Tone.Player;
	nightPlayer?: Tone.Player;
	queue: {
		timeout?: NodeJS.Timeout;
		buffer?: Tone.ToneAudioBuffer;
		song?: Song;
	};
};

const createInit = (): PlayerStore => {
	const fadeTime = 1;

	const crossFade = new Tone.CrossFade({ fade: 1 }).toDestination();

	const dayPlayer = new Tone.Player({
		fadeIn: fadeTime,
		fadeOut: fadeTime
	});

	const nightPlayer = new Tone.Player({
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

	const { subscribe, update, set } = writable<PlayerStore>(init);

	const updateAction = (newState: Partial<PlayerStore>) => {
		update((currentState) => ({ ...currentState, ...newState }));
	};

	const reset = () => {
		const { dayPlayer, nightPlayer } = get(playerStore);
		dayPlayer?.stop();
		nightPlayer?.stop();

		set(createInit());
	};

	return {
		subscribe,
		update: updateAction,
		reset
	};
}

export const playerStore = createPlayerStore();
