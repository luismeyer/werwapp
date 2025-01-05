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

export const gameState = $state<GameStore>(init);

export function resetGame() {
	gameState.state = init.state;
	gameState.phase = init.phase;
	gameState.nightCount = init.nightCount;
	gameState.roles = init.roles;
	gameState.isNarratorVisible = init.isNarratorVisible;
	gameState.currentRole = init.currentRole;
}
