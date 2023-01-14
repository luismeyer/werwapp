import { get } from 'svelte/store';
import { Buffer, type Player } from 'tone';

import { gameStore } from '$lib/stores/game';
import { playerStore } from '$lib/stores/player';

import { createApiSongUrl, fadeSongs, getRandomSong, loadNextRandomSong } from './song';
import { showCurrentSongToast } from './stores/toast';

/**
 *	Function will start the tone player and fetch one next song. A timeout
 *  will be started that ends at the same time the song ends. After the timeout
 *  the new fetched song will be played and the function is called recursivly
 */
const startPlayer = (player?: Player) => {
	if (!player) {
		return;
	}

	const { currentSong } = get(playerStore);
	const { gamestate } = get(gameStore);

	// start music
	player.start();

	// find random song exluding the current one
	const nextSongInQueue = getRandomSong(gamestate, currentSong);
	const songUrl = createApiSongUrl(nextSongInQueue);

	// create buffer and load next song
	const queueSongBuffer = new Buffer();
	queueSongBuffer.load(songUrl);

	const timeout = setTimeout(() => {
		player.buffer = queueSongBuffer;

		playerStore.update({ currentSong: nextSongInQueue });
		showCurrentSongToast();

		startPlayer(player);
	}, player.buffer.duration * 1000 - 500);

	playerStore.update({ queueTimeout: timeout });
};

export const startFirstNightPhase = () => {
	const { nightPlayer } = get(playerStore);

	gameStore.setState('night');

	// start the music
	startPlayer(nightPlayer);

	// load next day song
	loadNextRandomSong('day');
};

export const startNextGamePhase = async (nextPhase: 'night' | 'day') => {
	const { dayPlayer, nightPlayer, currentSong, nextSong, queueTimeout } = get(playerStore);

	clearTimeout(queueTimeout);

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

	// load next song for the phase after the next phase
	loadNextRandomSong(currentPhase, currentSong);

	// start the second player so both players make music
	startPlayer(nextPlayer);

	await fadeSongs(nextPhase);

	currentPlayer?.stop();

	playerStore.update({ fading: false });
};
