import { writable } from 'svelte/store';

import { AudioPlayer } from '../abstractions/AudioPlayer';
import { DaySongs, NightSongs } from '../abstractions/SongRepository';
import { gameStore } from './game.svelte';

export const isFading = writable(false);

const daySongs = new DaySongs();
const nightSongs = new NightSongs();

export const nightPlayer = new AudioPlayer(nightSongs);
export const dayPlayer = new AudioPlayer(daySongs);

export const currentPlayer = $derived(gameStore.phase === 'day' ? dayPlayer : nightPlayer);

export const nextPlayer = $derived(gameStore.phase === 'day' ? nightPlayer : dayPlayer);
