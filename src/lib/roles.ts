import { get } from 'svelte/store';
import { gameStore, type PlayerRole, type Role, type UtilityRole } from './stores/game';

const evilRolesCount = (roles: Role[]) =>
	roles
		.filter((role): role is PlayerRole => isPlayerRole(role) && role.isEvil)
		.reduce((acc, { amount = 0 }) => acc + amount, 0);

const innocentRolesCount = (roles: Role[]) =>
	roles
		.filter((role): role is PlayerRole => isPlayerRole(role) && !role.isEvil)
		.reduce((acc, { amount = 0 }) => acc + amount, 0);

export const activeRoles = (roles: Role[], nightCount: number) =>
	roles.filter(
		(role) =>
			isUtilityRole(role) ||
			// player
			(isPlayerRole(role) &&
				// user selected the role in setup
				role.amount > 0 &&
				// role is active in current night
				(!role.activeNights || role.activeNights?.includes(nightCount)))
	);

export const roleRemovable = (roles: Role[], role: PlayerRole): boolean => {
	const evils = evilRolesCount(roles);
	const innocents = innocentRolesCount(roles);

	if (role.isEvil) {
		// there has to be always 1 werewolf
		return evils > 1;
	}

	// there is always one more normal role than werewolfs
	return evils < innocents - 1;
};

export const roleAddable = (roles: Role[], role: PlayerRole): boolean => {
	const evils = evilRolesCount(roles);
	const innocents = innocentRolesCount(roles);

	if (role.isEvil) {
		// there is alway one more werewolf than other roles
		return innocents > evils + 1;
	}

	if (role.addable) {
		// role can be added infitely
		return true;
	}

	// the other roles can only be added once
	return role.amount === 0;
};

export const rolesValid = (roles: Role[]): boolean => {
	const evils = evilRolesCount(roles);
	const innocents = innocentRolesCount(roles);

	return evils > 0 && innocents > 0 && innocents > evils;
};

const firstRole = (activeGameRoles: Role[]) => {
	if (!activeGameRoles[0]) {
		throw new Error('Missing first role');
	}

	return activeGameRoles[0];
};

export const getNextRole = (currentRole?: Role): Role => {
	const { roles: rolesSet, nightCount } = get(gameStore);

	const roles = [...rolesSet];

	const activeGameRoles = activeRoles(roles, nightCount);

	// start with first role
	if (!currentRole) {
		return firstRole(activeGameRoles);
	}

	const currentIndex = activeGameRoles.indexOf(currentRole);

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

export const getPrevRole = (currentRole: Role): Role | undefined => {
	const { roles: rolesSet, nightCount } = get(gameStore);

	const roles = [...rolesSet];

	const activeGameRoles = activeRoles(roles, nightCount);

	const currentIndex = activeGameRoles.indexOf(currentRole);

	// can't go back to last
	if (currentIndex === 0) {
		return;
	}

	const previousRole = activeGameRoles[currentIndex - 1];

	// can't go back to util
	if (!previousRole || isUtilityRole(previousRole)) {
		return;
	}

	return previousRole;
};

export const isUtilityRole = (role: Role): role is UtilityRole => role.type === 'util';

export const isPlayerRole = (role: Role): role is PlayerRole => role.type === 'player';

export const isDayRole = ({ state }: Role) => state === 'day';

export const isNightRole = ({ state }: Role) => state === 'night';

export const roleState = (role: Role) => {
	if (isDayRole(role)) {
		return 'day';
	}

	if (isNightRole(role)) {
		return 'night';
	}

	throw new Error(`Missing role state for ${role.name}`);
};

export const showRole = (role?: Role) => {
	gameStore.updateStore({ currentRole: role });
};

export const getRole = (name: string): Role => {
	const { roles } = get(gameStore);

	const searchedRole = [...roles].find((role) => role.name === name);

	if (!searchedRole) {
		throw new Error('Missing role ' + name);
	}

	return searchedRole;
};

export const getUtilityRole = (name: string): UtilityRole => {
	const role = getRole(name);

	if (isPlayerRole(role)) {
		throw new Error('Missing util role ' + name);
	}

	return role;
};

export const getPlayerRole = (name: string): PlayerRole => {
	const role = getRole(name);

	if (isUtilityRole(role)) {
		throw new Error('Missing game role ' + name);
	}

	return role;
};
