import { gameStore } from '$lib/stores/game.svelte';
import { nightPlayer, isFading, dayPlayer, nextPlayer } from '$lib/stores/player.svelte';

import { goto } from '$app/navigation';
import { Crossfade } from './abstractions/Crossfade';

export const startFirstNightPhase = async () => {
	goto('/game');

	gameStore.currentRole = undefined;
	gameStore.state = 'running';
	gameStore.phase = 'night';

	// start the music
	nightPlayer.play();

	// prepare the day
	dayPlayer.loadSong();
};

export const startNextGamePhase = async () => {
	const { nightCount, phase } = gameStore;

	const nextPhase = phase === 'day' ? 'night' : 'day';

	gameStore.phase = nextPhase;
	gameStore.nightCount = nextPhase === 'night' ? nightCount + 1 : nightCount;

	isFading.set(true);

	const playerA = nextPhase === 'day' ? nightPlayer : dayPlayer;
	const playerB = nextPhase === 'day' ? dayPlayer : nightPlayer;

	const crossfade = new Crossfade(playerA, playerB);
	await crossfade.run();

	isFading.set(false);

	const player = nextPlayer;
	player.loadSong();
};
