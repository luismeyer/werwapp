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

export const gameStore = $state<GameStore>(init);

export function resetGame() {
	gameStore.state = init.state;
	gameStore.phase = init.phase;
	gameStore.nightCount = init.nightCount;
	gameStore.roles = init.roles;
	gameStore.isNarratorVisible = init.isNarratorVisible;
	gameStore.currentRole = init.currentRole;
}
