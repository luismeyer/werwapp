import { writable } from 'svelte/store';

import { RoleDefinitions } from './roles';

export type GameStore = {
	state: 'setup' | 'running' | 'finished';
	gamestate: 'day' | 'night';
	nightCount: number;
	isNarratorVisible: boolean;
	roles: Set<Role>;
	currentRole: Role;
};

export type PlayerRole = {
	type: 'player';
	state: 'day' | 'night';
	name: string;
	amount: number;
	addable: boolean;
	combinedWith?: string;
	prefix: 'feminimum' | 'masculinum' | 'neutrum';
	isEvil: boolean;
	activeNights?: number[];
};

export type UtilityRole = {
	type: 'util';
	state: 'day' | 'night';
	name: string;
};

export type Role = PlayerRole | UtilityRole;

export function createGameStateStore() {
	if (!RoleDefinitions[0]) {
		throw new Error('RoleDefinitions must not be empty');
	}

	const init: GameStore = {
		state: 'setup',
		gamestate: 'night',
		nightCount: 1,
		roles: new Set(RoleDefinitions),
		isNarratorVisible: false,
		currentRole: RoleDefinitions[0]
	};

	const { subscribe, set, update } = writable<GameStore>(init);

	const start = () => {
		update((currentState) => ({
			...currentState,
			state: 'running',
			gamestate: 'night'
		}));
	};

	const reset = () => {
		set(init);
	};

	const updateStore = (input: Partial<GameStore>) => {
		update((currentState) => ({ ...currentState, ...input }));
	};

	return {
		subscribe,
		start,
		updateStore,
		reset
	};
}

export const gameStore = createGameStateStore();
