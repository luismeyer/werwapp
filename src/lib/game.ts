import { get } from 'svelte/store';

import { gameStore } from '$lib/stores/game';
import { nightPlayer, isFading, dayPlayer, nextPlayer } from '$lib/stores/player';

import { fadeSongs } from './song';
import { goto } from '$app/navigation';

export const startFirstNightPhase = async () => {
	goto('/game');

	gameStore.start();

	// start the music
	nightPlayer.play();

	// prepare the day
	dayPlayer.loadSong();
};

export const startNextGamePhase = async () => {
	const { nightCount, gamestate } = get(gameStore);

	const nextPhase = gamestate === 'day' ? 'night' : 'day';

	gameStore.updateStore({
		gamestate: nextPhase,
		nightCount: nextPhase === 'night' ? nightCount + 1 : nightCount
	});

	isFading.set(true);

	await fadeSongs(nextPhase);

	isFading.set(false);

	const player = get(nextPlayer);
	player.loadSong();
};
