import type { Song } from '$lib/songs/song';
import { writable } from 'svelte/store';

export type GameState = {
	state: 'setup' | 'game' | 'finished';
	gamestate: 'day' | 'night';
	nightCount: number;
	roles: Role[];
	fading: boolean;
	currentSong?: Song;
	nextSong?: Song;
};

type Role = 'villager' | 'armor' | 'visionary' | 'witch' | 'werwolf' | 'villagehoe' | 'hunter';

export function createGameStateStore() {
	const { subscribe, set, update } = writable<GameState>({
		state: 'setup',
		gamestate: 'night',
		nightCount: 0,
		roles: [],
		fading: false
	});

	const setDay = () => {
		update((currentState) => ({ ...currentState, gamestate: 'day' }));
	};

	const setNight = () => {
		update((currentState) => ({
			...currentState,
			gamestate: 'night',
			nightCount: currentState.nightCount + 1
		}));
	};

	const reset = () => {
		set({
			state: 'setup',
			gamestate: 'night',
			nightCount: 0,
			fading: false,
			roles: []
		});
	};

	const updateGame = (input: Partial<GameState>) => {
		update((currentState) => ({ ...currentState, ...input }));
	};

	return {
		subscribe,
		setDay,
		setNight,
		updateGame,
		reset
	};
}

export const gameStore = createGameStateStore();
