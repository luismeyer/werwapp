import { get } from 'svelte/store';
import {
	gameStore,
	type GameRole,
	type GameRoleName,
	type Role,
	type RoleName,
	type UtilityRole,
	type UtilityRoleName
} from './stores/game';

const werewolfsCount = () => getGameRole('werewolf')?.amount ?? 0;

const normalCount = (roles: Role[]) =>
	roles
		.filter((role): role is GameRole => !isUtility(role) && role.name !== 'werewolf')
		.reduce((acc, { amount = 0 }) => acc + amount, 0);

export const activeRoles = (roles: Role[]) =>
	roles.filter((role) => isUtility(role) || role.amount > 0);

export const roleRemovable = (roles: Role[], role: RoleName): boolean => {
	const werewolfs = werewolfsCount();
	const rest = normalCount(roles);

	if (role === 'werewolf') {
		// there hat to be always 1 werewolf
		return werewolfs > 1;
	}

	// there is always one more normal roles than werewolfs
	return werewolfs <= rest - 2;
};

export const roleAddable = (roles: Role[], role: RoleName): boolean => {
	const werewolfs = werewolfsCount();
	const rest = normalCount(roles);

	if (role === 'day' || role === 'night') {
		return false;
	}

	if (role === 'werewolf') {
		// there can only be less werewolfs than other roles
		return rest > werewolfs;
	}

	if (role !== 'villager') {
		const existingRole = getGameRole(role);
		// the other roles can only be added once
		return existingRole?.amount === 0;
	}

	return true;
};

export const rolesValid = (roles: Role[]): boolean => {
	const werewolfs = werewolfsCount();
	const rest = normalCount(roles);

	return werewolfs > 0 && rest > 0 && rest >= werewolfs;
};

export const getNextRole = (currentRole?: Role): Role => {
	const { roles: rolesSet, nightCount } = get(gameStore);

	const isFirstNight = nightCount <= 1;
	const roles = [...rolesSet];

	let activeGameRoles = activeRoles(roles);

	if (!isFirstNight) {
		activeGameRoles = activeGameRoles.filter(({ name }) => name !== 'amor');
	}

	if (!currentRole) {
		return activeGameRoles[0];
	}

	const currentIndex = activeGameRoles.indexOf(currentRole);

	if (currentIndex === activeGameRoles.length - 1) {
		return activeGameRoles[0];
	}

	return activeGameRoles[currentIndex + 1];
};

export const getPrevRole = (currentRole: Role): Role | undefined => {
	const { roles: rolesSet, nightCount } = get(gameStore);

	const isFirstNight = nightCount <= 1;
	const roles = [...rolesSet];

	let activeGameRoles = activeRoles(roles);

	if (!isFirstNight) {
		activeGameRoles = activeGameRoles.filter(({ name }) => name !== 'amor');
	}

	const currentIndex = activeGameRoles.indexOf(currentRole);

	if (currentIndex === 0) {
		return;
	}

	const previousRole = activeGameRoles[currentIndex - 1];

	if (!previousRole || isUtility(previousRole)) {
		return;
	}

	return previousRole;
};

export const isUtility = (role: Role): role is UtilityRole =>
	role.name === 'day' || role.name === 'night';

export const isDayRole = ({ name }: Role) =>
	name === 'day' || name === 'villager' || name === 'hunter';

export const isNightRole = ({ name }: Role) =>
	name === 'night' ||
	name === 'seer' ||
	name === 'werewolf' ||
	name === 'witch' ||
	name === 'amor' ||
	name === 'girl';

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

export const getRole = (name: RoleName): Role => {
	const { roles } = get(gameStore);

	const searchedRole = [...roles].find((role) => role.name === name);

	if (!searchedRole) {
		throw new Error('Missing role ' + name);
	}

	return searchedRole;
};

export const getUtilityRole = (name: UtilityRoleName): UtilityRole => {
	const role = getRole(name);

	if (!isUtility(role)) {
		throw new Error('Missing util role ' + name);
	}

	return role;
};

export const getGameRole = (name: GameRoleName): GameRole => {
	const role = getRole(name);

	if (isUtility(role)) {
		throw new Error('Missing game role ' + name);
	}

	return role;
};
