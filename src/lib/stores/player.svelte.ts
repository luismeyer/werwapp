import { writable } from 'svelte/store';

import { AudioPlayer } from '../abstractions/AudioPlayer.svelte';
import { DaySongs, NightSongs } from '../abstractions/SongRepository';
import { gameState } from './game.svelte';

export const isFading = writable(false);

const daySongs = new DaySongs();
const nightSongs = new NightSongs();

export const nightPlayer = new AudioPlayer(nightSongs, 'Night');
export const dayPlayer = new AudioPlayer(daySongs, 'Day');

const nextPlayer = $derived(gameState.phase === 'day' ? nightPlayer : dayPlayer);

export const getNextPlayer = () => nextPlayer;
