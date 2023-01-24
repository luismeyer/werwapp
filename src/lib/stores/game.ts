import { writable } from 'svelte/store';

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
	male?: boolean;
};

export type UtilityRole = {
	name: UtilityRoleName;
};

export type Role = GameRole | UtilityRole;

export type RoleName = Role['name'];

// This also defined the order of the Roles
const RoleDefinitions: Role[] = [
	{ name: 'night' },
	{ name: 'amor', amount: 1, male: true },
	{ name: 'werewolf', amount: 1, male: true },
	{ name: 'girl', amount: 1, combinedWith: 'werewolf' },
	{ name: 'witch', amount: 1 },
	{ name: 'seer', amount: 1 },
	{ name: 'day' },
	{ name: 'hunter', amount: 1, male: true },
	{ name: 'villager', amount: 1, male: true }
];

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
