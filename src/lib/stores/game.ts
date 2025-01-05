import { writable } from 'svelte/store';

import { RolesDefinition, type PlayerRoleDef, type UtilityRoleDef } from '../../const/roles';

export type PlayerRole = PlayerRoleDef & {
	amount: number;
};

export type UtilityRole = UtilityRoleDef;

export type Role = PlayerRole | UtilityRoleDef;

export type GameStore = {
	state: 'setup' | 'running' | 'finished';
	phase: 'day' | 'night';
	nightCount: number;
	isNarratorVisible: boolean;
	roles: Set<Role>;
	currentRole?: Role;
};

export function createGameStateStore() {
	const defaultRoles = new Set(
		Object.values(RolesDefinition)
			.sort((a, b) => a.order - b.order)
			.map((role) => (role.type === 'player' ? { ...role, amount: 1 } : role))
	);

	const init: GameStore = {
		state: 'setup',
		phase: 'night',
		nightCount: 1,
		roles: defaultRoles,
		isNarratorVisible: false,
		currentRole: undefined
	};

	const { subscribe, set, update } = writable<GameStore>(init);

	const start = () => {
		update((currentState) => ({
			...currentState,
			currentRole: undefined,
			state: 'running',
			phase: 'night'
		}));
	};

	const reset = () => {
		set({ ...init, roles: defaultRoles });
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
