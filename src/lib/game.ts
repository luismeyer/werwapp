import { get } from 'svelte/store';

import { gameStore } from '$lib/stores/game';
import { nightPlayer, isFading, dayPlayer, nextPlayer } from '$lib/stores/player';

import { goto } from '$app/navigation';
import { Crossfade } from './abstractions/Crossfade';

export const startFirstNightPhase = async () => {
	goto('/game');

	gameStore.start();

	// start the music
	nightPlayer.play();

	// prepare the day
	dayPlayer.loadSong();
};

export const startNextGamePhase = async () => {
	const { nightCount, phase } = get(gameStore);

	const nextPhase = phase === 'day' ? 'night' : 'day';

	gameStore.updateStore({
		phase: nextPhase,
		nightCount: nextPhase === 'night' ? nightCount + 1 : nightCount
	});

	isFading.set(true);

	const playerA = nextPhase === 'day' ? nightPlayer : dayPlayer;
	const playerB = nextPhase === 'day' ? dayPlayer : nightPlayer;

	const crossfade = new Crossfade(playerA, playerB);
	await crossfade.run();

	isFading.set(false);

	const player = get(nextPlayer);
	player.loadSong();
};
