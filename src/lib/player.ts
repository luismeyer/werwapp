import { get } from 'svelte/store';
import * as Tone from 'tone';

import { gameStore } from '$lib/stores/game';
import { playerStore } from '$lib/stores/player';

import { createApiSongUrl, getRandomSong } from './song';
import { showCurrentSongToast, showErrorToast, showToast } from './stores/toast';

/**
 * Function will shift a new song into the current player.
 * Afterwards another song is put into the queue.
 */
export const shiftQueueIntoPlayer = async () => {
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

	await startCurrentPlayer();
};

/**
 * Function will start the tone player and fetch one next song. A timeout
 * will be started that ends at the same time the song ends. After the timeout
 * the new fetched song will be played and the function is called recursivly
 */
export const startCurrentPlayer = async () => {
	const player = getCurrentPlayer();

	if (!player) {
		throw new Error('Trying to start undefined player');
	}

	// start the tone transport and the queue timeout
	resumeCurrentPlayer();

	// sync player to tone transport
	player.sync().start();

	playerStore.update({
		playing: true,
		progress: 0,
		currentSongDuration: player.buffer.duration
	});

	const { gamestate } = get(gameStore);
	const { currentPhaseSong, queue } = get(playerStore);

	// find random song exluding the current one
	const songInQueue = getRandomSong(gamestate, currentPhaseSong);

	// create buffer and load next song
	const queueBuffer = new Tone.ToneAudioBuffer();

	await queueBuffer.load(createApiSongUrl(songInQueue, gamestate)).catch(showErrorToast);
	playerStore.update({ queue: { ...queue, buffer: queueBuffer, song: songInQueue } });
};

export const getCurrentPlayer = () => {
	const { gamestate } = get(gameStore);
	const { dayPlayer, nightPlayer } = get(playerStore);

	return gamestate === 'day' ? dayPlayer : nightPlayer;
};

/**
 * Function pauses the transport and clears the timeout of the queue
 */
export const pauseCurrentPlayer = () => {
	const {
		playing,
		queue: { timeout }
	} = get(playerStore);

	if (!playing) {
		throw new Error('Trying to pause already paused player');
	}

	if (!timeout) {
		throw new Error('Trying to pause without timeout');
	}

	Tone.Transport.pause();

	// clearing queue
	clearTimeout(timeout);

	playerStore.update({ playing: false });
};

/**
 * Function will resume the transport and create a new queue timeout that
 * will shift the next song into the player at the correct time
 */
export const resumeCurrentPlayer = () => {
	const player = getCurrentPlayer();

	if (!player) {
		throw new Error('Trying to resume undefined player');
	}

	// start music
	Tone.Transport.start();

	const { progress, queue } = get(playerStore);

	// calculate end of current song
	const remainingSongDuration = (player.buffer.duration - progress) * 1000;

	const timeout = setTimeout(shiftQueueIntoPlayer, remainingSongDuration - 500);

	playerStore.update({ playing: true, queue: { ...queue, timeout } });
};
