import { writable } from 'svelte/store';

export type GameStore = {
	state: 'setup' | 'running' | 'finished';
	gamestate: 'day' | 'night';
	nightCount: number;
	roles: Role[];
};

type Role = 'villager' | 'armor' | 'visionary' | 'witch' | 'werwolf' | 'villagehoe' | 'hunter';

export function createGameStateStore() {
	const init: GameStore = {
		state: 'setup',
		gamestate: 'night',
		nightCount: 1,
		roles: []
	};

	const { subscribe, set, update } = writable<GameStore>(init);

	const start = () => {
		update((currentState) => ({
			...currentState,
			state: 'running',
			gamestate: 'night'
		}));
	};

	const setState = (gamestate: GameStore['gamestate'], increaseNightCount?: boolean) => {
		update((currentState) => ({
			...currentState,
			gamestate,
			nightCount: increaseNightCount ? currentState.nightCount + 1 : currentState.nightCount
		}));
	};

	const reset = () => {
		set(init);
	};

	const updateGame = (input: Partial<GameStore>) => {
		update((currentState) => ({ ...currentState, ...input }));
	};

	return {
		subscribe,
		setState,
		start,
		updateGame,
		reset
	};
}

export const gameStore = createGameStateStore();
