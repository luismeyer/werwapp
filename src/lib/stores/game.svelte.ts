import { RolesDefinition, type PlayerRoleDef, type UtilityRoleDef } from '../../const/roles';
import { themeState } from './theme.svelte';

export type PlayerRole = PlayerRoleDef & {
	amount: number;
};

export type UtilityRole = UtilityRoleDef;

export type Role = PlayerRole | UtilityRoleDef;

export type GameStore = {
	state: 'setup' | 'running' | 'finished';
	phase: 'day' | 'night';
	isFading: boolean;
	nightCount: number;
	roles: Role[];
	currentRole?: Role;
};

const defaultRoles = RolesDefinition.sort((a, b) => a.order - b.order).map((role) =>
	role.type === 'player' ? { ...role, amount: 1 } : role
);

const init: GameStore = {
	state: 'setup',
	phase: 'night',
	nightCount: 1,
	isFading: false,
	roles: defaultRoles,
	currentRole: undefined
};

export const gameState = $state<GameStore>(init);

export function resetGame() {
	gameState.state = init.state;
	gameState.phase = init.phase;
	gameState.nightCount = init.nightCount;
	gameState.roles = init.roles;
	gameState.currentRole = init.currentRole;
	gameState.isFading = init.isFading;
}

$effect.root(() => {
	$effect(() => {
		const currentTheme =
			themeState.autoSwitching && gameState.phase === 'day'
				? themeState.lightTheme
				: themeState.darkTheme;

		document.documentElement.setAttribute('data-theme', currentTheme);
	});
});
