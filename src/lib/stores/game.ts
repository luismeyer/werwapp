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

export type UtilityRoleName = 'night' | 'day';

export type GameRoleName = 'amor' | 'girl' | 'hunter' | 'seer' | 'werewolf' | 'witch' | 'villager';

export type GameRole = {
	name: GameRoleName;
	amount: number;
	combinedWith?: RoleName;
	prefix: 'feminimum' | 'masculinum' | 'neutrum';
};

export type UtilityRole = {
	name: UtilityRoleName;
};

export type Role = GameRole | UtilityRole;

export type RoleName = Role['name'];

export function createGameStateStore() {
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
