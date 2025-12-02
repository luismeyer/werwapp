import { gameState } from "$lib/stores/game.svelte";
import {
	dayPlayer,
	getNextPlayer,
	getPlayer,
	nightPlayer,
} from "$lib/stores/player.svelte";

import { Crossfade } from "./abstractions/Crossfade";
import { getRoleById, getUtilityRole } from "./roles.svelte";

export const syncCurrentPhase = async () => {
	if (gameState.currentRoleId) {
		const currentRole = getRoleById(gameState.currentRoleId);

		if (gameState.phase !== currentRole.state) {
			gameState.currentRoleId = getUtilityRole(gameState.phase).id;
		}
	}

	const currentPlayer = getPlayer();
	if (!currentPlayer.ready) {
		void currentPlayer.loadSong();
	}

	const nextPlayer = getNextPlayer();
	if (!nextPlayer.ready) {
		void nextPlayer.loadSong();
	}
};

export const startNextGamePhase = async () => {
	const nextPhase = gameState.phase === "day" ? "night" : "day";

	gameState.phase = nextPhase;
	if (nextPhase === "night") {
		gameState.nightCount = gameState.nightCount + 1;

		gameState.currentRoleId = getUtilityRole("night").id;
	} else {
		gameState.currentRoleId = getUtilityRole("day").id;
	}

	gameState.isFading = true;

	const playerA = nextPhase === "day" ? nightPlayer : dayPlayer;
	const playerB = nextPhase === "day" ? dayPlayer : nightPlayer;

	const crossfade = new Crossfade(playerA, playerB);
	await crossfade.run();

	gameState.isFading = false;

	const player = getNextPlayer();
	player.loadSong();
};
