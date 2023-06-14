import { dayPlayer, nightPlayer } from '$lib/stores/player';

import { Crossfade } from './abstractions/Crossfade';

export type Songs = {
	daySongs: Song[];
	nightSongs: Song[];
};

export const fadeSongs = (nextPhase: 'day' | 'night') => {
	const playerA = nextPhase === 'day' ? nightPlayer : dayPlayer;
	const playerB = nextPhase === 'day' ? dayPlayer : nightPlayer;

	const crossfade = new Crossfade(playerA, playerB);

	return crossfade.run();
};

export type Song = {
	type: 'day' | 'night';
	id: number;
	title: string;
	songPage: string;
	songUrl: string;
	artist: string;
};
