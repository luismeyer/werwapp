import { get } from 'svelte/store';
import { Buffer, Transport, type Player } from 'tone';

import { gameStore } from '$lib/stores/game';
import { playerStore } from '$lib/stores/player';

import { createApiSongUrl, getRandomSong } from './song';
import { showCurrentSongToast } from './stores/toast';

export const shiftQueueIntoPlayer = () => {
	const {
		queue: { buffer, song, timeout }
	} = get(playerStore);

	clearTimeout(timeout);

	const player = getCurrentPlayer();

	if (!player || !song || !timeout || !buffer) {
		throw new Error('Dequeue with undefined player, buffer, song or timeout');
	}

	// if buffer didn't finish loading wait for it
	if (!buffer?.loaded) {
		buffer.onload = shiftQueueIntoPlayer;
		return;
	}

	// stop the player first for better transition
	player.stop();
	player.buffer = buffer;

	playerStore.update({ currentPhaseSong: song, queue: {} });
	showCurrentSongToast();

	startPlayer(player);
};

/**
 *	Function will start the tone player and fetch one next song. A timeout
 *  will be started that ends at the same time the song ends. After the timeout
 *  the new fetched song will be played and the function is called recursivly
 */
export const startPlayer = async (player?: Player) => {
	if (!player) {
		return;
	}

	// start music
	Transport.start();
	player.sync().start();

	const timeout = setTimeout(shiftQueueIntoPlayer, player.buffer.duration * 1000 - 500);

	const { currentPhaseSong } = get(playerStore);
	const { gamestate } = get(gameStore);

	// find random song exluding the current one
	const songInQueue = getRandomSong(gamestate, currentPhaseSong);

	// create buffer and load next song
	const queueBuffer = new Buffer();
	await queueBuffer.load(createApiSongUrl(songInQueue));

	playerStore.update({ paused: false, queue: { timeout, buffer: queueBuffer, song: songInQueue } });
};

export const getCurrentPlayer = () => {
	const { gamestate } = get(gameStore);
	const { dayPlayer, nightPlayer } = get(playerStore);

	return gamestate === 'day' ? dayPlayer : nightPlayer;
};
