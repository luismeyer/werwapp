import { get } from 'svelte/store';

import { gameStore } from '$lib/stores/game';
import { playerStore } from '$lib/stores/player';

import { fadeSongs, loadNextRandomSong } from './song';
import { songData } from './songdata';

export const startFirstNightPhase = () => {
	const { nightPlayer } = get(playerStore);

	// start the music
	nightPlayer?.start();

	gameStore.setState('night');

	// load next day song
	loadNextRandomSong(songData.daySongs, 'day');
};

export const startNextGamePhase = async (nextPhase: 'night' | 'day') => {
	const { dayPlayer, nightPlayer, currentSong, nextSong } = get(playerStore);

	// start the ui transition
	gameStore.setState(nextPhase);

	const currentPhase = nextPhase === 'night' ? 'day' : 'night';

	const currentPlayer = currentPhase === 'day' ? dayPlayer : nightPlayer;
	const nextPlayer = nextPhase === 'day' ? dayPlayer : nightPlayer;

	playerStore.update({
		fading: true,
		currentSong: nextSong,
		nextSong: undefined
	});

	// load next song during fade
	loadNextRandomSong(songData.daySongs, nextPhase, currentSong);

	// start the second player so both players make music
	nextPlayer?.start();

	await fadeSongs(nextPhase);

	currentPlayer?.stop();

	playerStore.update({ fading: false });
};
