import { get, writable } from 'svelte/store';
import { roleDefinitionsStore, type PlayerRoleDef, type UtilityRoleDef } from './roles';

export type PlayerRole = PlayerRoleDef & {
	amount: number;
};

export type UtilityRole = UtilityRoleDef;

export type Role = PlayerRole | UtilityRoleDef;

export type GameStore = {
	state: 'setup' | 'running' | 'finished';
	gamestate: 'day' | 'night';
	nightCount: number;
	isNarratorVisible: boolean;
	roles: Set<Role>;
	currentRole?: Role;
};

export function createGameStateStore() {
	const init: GameStore = {
		state: 'setup',
		gamestate: 'night',
		nightCount: 1,
		roles: new Set(),
		isNarratorVisible: false,
		currentRole: undefined
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

roleDefinitionsStore.store.subscribe((roleDefinitions) => {
	const { state } = get(gameStore);

	if (state !== 'setup' || !roleDefinitions) {
		return;
	}

	const init = Object.values(roleDefinitions)
		.sort((a, b) => a.order - b.order)
		.map((role) => (role.type === 'player' ? { ...role, amount: 1 } : role));

	gameStore.updateStore({ roles: new Set(init) });
});

void roleDefinitionsStore.revalidate();
