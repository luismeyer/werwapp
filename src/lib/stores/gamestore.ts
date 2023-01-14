import { writable } from 'svelte/store';

export type GameStore = {
	state: 'setup' | 'game' | 'finished';
	gamestate: 'day' | 'night';
	nightCount: number;
	roles: Role[];
};

type Role = 'villager' | 'armor' | 'visionary' | 'witch' | 'werwolf' | 'villagehoe' | 'hunter';

export function createGameStateStore() {
	const { subscribe, set, update } = writable<GameStore>({
		state: 'setup',
		gamestate: 'night',
		nightCount: 0,
		roles: []
	});

	const setState = (gamestate: GameStore['gamestate']) => {
		update((currentState) => ({
			...currentState,
			gamestate,
			nightCount: currentState.nightCount + 1
		}));
	};

	const reset = () => {
		set({
			state: 'setup',
			gamestate: 'night',
			nightCount: 0,
			roles: []
		});
	};

	const updateGame = (input: Partial<GameStore>) => {
		update((currentState) => ({ ...currentState, ...input }));
	};

	return {
		subscribe,
		setState,
		updateGame,
		reset
	};
}

export const gameStore = createGameStateStore();
