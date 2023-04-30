import { dayPlayer, nightPlayer } from '$lib/stores/player';

import { Crossfade } from './abstractions/Crossfade';

export type Song = {
	type: 'day' | 'night';
	title: string;
	songPage: string;
	artist: string;
};

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

export const createApiSongUrl = (song: Song) =>
	`api/songs?state=${song.type}&title=${song.title}&artist=${song.artist}`;
