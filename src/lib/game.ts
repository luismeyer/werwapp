import { gameState } from '$lib/stores/game.svelte';
import { nightPlayer, isFading, dayPlayer, getNextPlayer } from '$lib/stores/player.svelte';

import { goto } from '$app/navigation';
import { Crossfade } from './abstractions/Crossfade';

export const startFirstNightPhase = async () => {
	goto('/game');

	gameState.currentRole = undefined;
	gameState.state = 'running';
	gameState.phase = 'night';

	// start the music
	nightPlayer.play();

	// prepare the day
	dayPlayer.loadSong();
};

export const startNextGamePhase = async () => {
	const { nightCount, phase } = gameState;

	const nextPhase = phase === 'day' ? 'night' : 'day';

	gameState.phase = nextPhase;
	gameState.nightCount = nextPhase === 'night' ? nightCount + 1 : nightCount;

	isFading.set(true);

	const playerA = nextPhase === 'day' ? nightPlayer : dayPlayer;
	const playerB = nextPhase === 'day' ? dayPlayer : nightPlayer;

	const crossfade = new Crossfade(playerA, playerB);
	await crossfade.run();

	isFading.set(false);

	const player = getNextPlayer();
	player.loadSong();
};
