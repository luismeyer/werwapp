import { AudioPlayer } from '../abstractions/AudioPlayer.svelte';
import { DaySongs, NightSongs } from '../abstractions/SongRepository';
import { gameState } from './game.svelte';

const daySongs = new DaySongs();
const nightSongs = new NightSongs();

export const nightPlayer = new AudioPlayer(nightSongs);
export const dayPlayer = new AudioPlayer(daySongs);

const player = $derived(gameState.phase === 'day' ? dayPlayer : nightPlayer);
const nextPlayer = $derived(gameState.phase === 'day' ? nightPlayer : dayPlayer);

export const getNextPlayer = () => nextPlayer;
export const getPlayer = () => player;
