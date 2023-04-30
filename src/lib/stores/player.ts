import { derived, writable } from 'svelte/store';

import { AudioPlayer } from '../abstractions/AudioPlayer';
import { DaySongs, NightSongs } from '../abstractions/SongRepository';
import { gameStore } from './game';

export const isFading = writable(false);

const daySongs = new DaySongs();
const nightSongs = new NightSongs();

export const nightPlayer = new AudioPlayer(nightSongs);
export const dayPlayer = new AudioPlayer(daySongs);

export const currentPlayer = derived(gameStore, ($game) =>
	$game.gamestate === 'day' ? dayPlayer : nightPlayer
);

export const nextPlayer = derived(gameStore, ($game) =>
	$game.gamestate === 'day' ? nightPlayer : dayPlayer
);
