import { gameState, type PlayerRole, type Role, type UtilityRole } from './stores/game.svelte';

const playerRoles = $derived(
	gameState.roles.filter((role): role is PlayerRole => role.type === 'player')
);

export function getPlayerRoles() {
	return playerRoles;
}

export const evilRolesCount = (roles: Role[]) =>
	roles
		.filter((role): role is PlayerRole => role.type === 'player' && role.isEvil)
		.reduce((acc, { amount = 0 }) => acc + amount, 0);

export const innocentRolesCount = (roles: Role[]) =>
	roles
		.filter((role): role is PlayerRole => role.type === 'player' && !role.isEvil)
		.reduce((acc, { amount = 0 }) => acc + amount, 0);

const activeGameRoles = $derived(
	gameState.roles.filter(
		(role) =>
			(gameState.state === 'running' && role.type === 'util') ||
			// player
			(role.type === 'player' &&
				// user selected the role in setup
				role.amount > 0 &&
				// role is active in current night
				(!role.activeNights || role.activeNights?.includes(gameState.nightCount)))
	)
);

export const getActiveGameRoles = () => activeGameRoles;

export const playerRoleRemovable = (role: PlayerRole): boolean => {
	const evils = evilRolesCount(playerRoles);
	const innocents = innocentRolesCount(playerRoles);

	if (role.isEvil) {
		// there has to be always 1 werewolf
		return evils > 1;
	}

	// there is always one more normal role than werewolfs
	return evils < innocents - 1;
};

const firstRole = (roles: Role[]) => {
	if (!roles[0]) {
		throw new Error('Missing first role');
	}

	return roles[0];
};

export const getNextGameRole = (role: Role) => {
	// start with first role
	if (!role) {
		return firstRole(activeGameRoles);
	}

	const currentIndex = activeGameRoles.indexOf(role);

	// startover again
	if (currentIndex === activeGameRoles.length - 1) {
		return firstRole(activeGameRoles);
	}

	const nextRole = activeGameRoles[currentIndex + 1];
	if (!nextRole) {
		throw new Error('No next role');
	}

	return nextRole;
};

export const getPrevGameRole = (role: Role): Role | undefined => {
	const currentIndex = activeGameRoles.indexOf(role);

	// can't go back to last
	if (currentIndex === 0) {
		return;
	}

	const previousRole = activeGameRoles[currentIndex - 1];

	// can't go back to util
	if (!previousRole || previousRole.type === 'util') {
		return;
	}

	return previousRole;
};

export const showRole = (role?: Role) => {
	gameState.currentRole = role;
};

const getRole = (name: string): Role => {
	const { roles } = gameState;

	const searchedRole = [...roles].find((role) => role.name === name);

	if (!searchedRole) {
		throw new Error(`Missing role ${name}`);
	}

	return searchedRole;
};

export const getUtilityRole = (name: string): UtilityRole => {
	const role = getRole(name);

	if (role.type === 'player') {
		throw new Error(`Missing util role ${name}`);
	}

	return role;
};
