import { get } from 'svelte/store';

import { gameStore } from '$lib/stores/game';
import { playerStore } from '$lib/stores/player';

import { fadeSongs, loadNextRandomSongForPhase } from './song';
import { startPlayer } from './player';

import * as Tone from 'tone';
import { showCurrentSongToast } from './stores/toast';

export const startFirstNightPhase = async () => {
	const { nightPlayer } = get(playerStore);

	await Tone.start();

	gameStore.start();

	showCurrentSongToast();

	// load next day song
	loadNextRandomSongForPhase('day');

	// start the music
	startPlayer(nightPlayer);
};

export const startNextGamePhase = async (nextPhase: 'night' | 'day') => {
	const { dayPlayer, nightPlayer, currentPhaseSong, nextPhaseSong, queue } = get(playerStore);
	const { nightCount } = get(gameStore);

	clearTimeout(queue.timeout);

	// start the ui transition

	gameStore.updateStore({
		gamestate: nextPhase,
		nightCount: nextPhase === 'night' ? nightCount + 1 : nightCount
	});

	const currentPhase = nextPhase === 'night' ? 'day' : 'night';

	const currentPlayer = currentPhase === 'day' ? dayPlayer : nightPlayer;
	const nextPlayer = nextPhase === 'day' ? dayPlayer : nightPlayer;

	playerStore.update({
		fading: true,
		currentPhaseSong: nextPhaseSong,
		nextPhaseSong: undefined,
		queue: {}
	});

	// load next song for the phase after the next phase
	loadNextRandomSongForPhase(currentPhase, currentPhaseSong);

	// start the second player so both players make music
	startPlayer(nextPlayer);

	await fadeSongs(nextPhase);

	currentPlayer?.stop();

	playerStore.update({ fading: false });

	showCurrentSongToast();
};
