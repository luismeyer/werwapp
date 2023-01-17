import { get, writable } from 'svelte/store';
import * as Tone from 'tone';

import { browser } from '$app/environment';
import type { Song } from '$lib/song';
import { getCurrentPlayer } from '$lib/player';

export type PlayerStore = {
	fading: boolean;
	paused: boolean;
	progress: number;
	currentPhaseSong?: Song;
	currentSongDuration: number;
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

let progressTimer: NodeJS.Timer;

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
		progress: 0,
		currentSongDuration: 100,
		queue: {}
	};
};

export function createPlayerStore() {
	const init: PlayerStore | undefined = browser
		? createInit()
		: { currentSongDuration: 100, fading: false, paused: false, progress: 0, queue: {} };

	const { subscribe, update, set } = writable<PlayerStore>(init);

	const updateAction = (newState: Partial<PlayerStore>) => {
		if (newState.paused != undefined) {
			handlePaused(newState.paused);
		}
		if (newState.currentPhaseSong != undefined) {
			clearInterval(progressTimer);
			newState.progress = 0;
			newState.currentSongDuration = getCurrentPlayer()?.buffer.duration;
			progressTimer = createInterval();
		}

		update((currentState) => ({ ...currentState, ...newState }));
	};

	const reset = () => {
		const { dayPlayer, nightPlayer } = get(playerStore);
		dayPlayer?.stop();
		nightPlayer?.stop();

		set(createInit());
	};

	const handlePaused = (paused: boolean) => {
		if (paused) {
			clearInterval(progressTimer);
		} else {
			progressTimer = createInterval();
		}
	};

	const createInterval = (): NodeJS.Timer =>
		setInterval(() => {
			update((currentState) => ({ ...currentState, progress: currentState.progress + 1 }));
		}, 1000);

	progressTimer = createInterval();

	return {
		subscribe,
		update: updateAction,
		reset
	};
}

export const playerStore = createPlayerStore();
