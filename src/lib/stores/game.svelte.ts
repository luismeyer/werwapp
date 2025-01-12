import { cookies } from '$lib/cookies';
import { RoleDefinitions, type PlayerRoleDef, type UtilityRoleDef } from '../../const/roles';

export const GAME_KEY = 'werwapp-game';

export type PlayerRole = PlayerRoleDef & {
	amount: number;
};

export type UtilityRole = UtilityRoleDef;

export type Role = PlayerRole | UtilityRoleDef;

export type GameSate = {
	state: 'setup' | 'running' | 'finished';
	phase: 'day' | 'night';
	isFading: boolean;
	nightCount: number;
	roles: Role[];
	currentRoleId?: string;
};

const Roles = Object.values(RoleDefinitions)
	.sort((a, b) => a.order - b.order)
	.map((role) => (role.type === 'player' ? { ...role, amount: 1 } : role));

const GameStateDefault: GameSate = {
	state: 'setup',
	phase: 'night',
	nightCount: 1,
	isFading: false,
	roles: Roles,
	currentRoleId: undefined
};

export const gameState = $state<GameSate>(GameStateDefault);

export function resetGame() {
	gameState.state = GameStateDefault.state;
	gameState.phase = GameStateDefault.phase;
	gameState.nightCount = GameStateDefault.nightCount;
	gameState.roles = GameStateDefault.roles;
	gameState.currentRoleId = GameStateDefault.currentRoleId;
	gameState.isFading = GameStateDefault.isFading;
}

type SerializedGameState = Omit<GameSate, 'roles' | 'currentRole'> & {
	currentRoleId?: string;
	roles: Record<string, number>;
};

function serializeGameState() {
	const roles: Record<string, number> = {};
	for (const role of gameState.roles.filter((role) => role.type === 'player')) {
		roles[role.id] = role.amount;
	}

	const serializedGame: SerializedGameState = {
		...gameState,
		currentRoleId: gameState.currentRoleId,
		roles
	};

	cookies.set(GAME_KEY, JSON.stringify(serializedGame));
}

export function parseGameState(raw: string) {
	const serializedGameState: SerializedGameState = JSON.parse(raw);

	return serializedGameState;
}

export function deserializeGameState(raw: string) {
	const serializedGameState = parseGameState(raw);

	gameState.state = serializedGameState.state;
	gameState.phase = serializedGameState.phase;
	gameState.nightCount = serializedGameState.nightCount;
	gameState.isFading = serializedGameState.isFading;
	gameState.currentRoleId = serializedGameState.currentRoleId;

	for (const role of gameState.roles) {
		if (role.type === 'player') {
			role.amount = serializedGameState.roles[role.id];
		}
	}
}

$effect.root(() => {
	$effect(() => {
		serializeGameState();
	});
});
