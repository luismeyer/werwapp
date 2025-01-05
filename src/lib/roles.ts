import { derived, get } from 'svelte/store';
import { gameStore, type PlayerRole, type Role, type UtilityRole } from './stores/game.svelte';

export const playerRolesArray = derived(gameStore, ({ roles }) =>
	[...roles].filter((role): role is PlayerRole => role.type === 'player')
);

const evilRolesCount = (roles: Role[]) =>
	roles
		.filter((role): role is PlayerRole => role.type === 'player' && role.isEvil)
		.reduce((acc, { amount = 0 }) => acc + amount, 0);

const innocentRolesCount = (roles: Role[]) =>
	roles
		.filter((role): role is PlayerRole => role.type === 'player' && !role.isEvil)
		.reduce((acc, { amount = 0 }) => acc + amount, 0);

export const activeGameRoles = derived(gameStore, ({ state, roles, nightCount }) =>
	[...roles].filter(
		(role) =>
			(state === 'running' && role.type === 'util') ||
			// player
			(role.type === 'player' &&
				// user selected the role in setup
				role.amount > 0 &&
				// role is active in current night
				(!role.activeNights || role.activeNights?.includes(nightCount)))
	)
);

export const playerRoleRemovable = derived(
	playerRolesArray,
	(roles) =>
		(role: PlayerRole): boolean => {
			const evils = evilRolesCount(roles);
			const innocents = innocentRolesCount(roles);

			if (role.isEvil) {
				// there has to be always 1 werewolf
				return evils > 1;
			}

			// there is always one more normal role than werewolfs
			return evils < innocents - 1;
		}
);

export const addablePlayerRoles = derived(playerRolesArray, (roles) =>
	roles.filter((role: PlayerRole): boolean => {
		const evils = evilRolesCount(roles);
		const innocents = innocentRolesCount(roles);

		if (!role.addable) {
			return role.amount === 0;
		}

		if (role.isEvil) {
			// there is alway one more werewolf than other roles
			return innocents > evils + 1;
		}

		return true;
	})
);

export const playerRolesValid = derived(playerRolesArray, (roles): boolean => {
	const evils = evilRolesCount(roles);
	const innocents = innocentRolesCount(roles);

	return evils > 0 && innocents > 0 && innocents > evils;
});

const firstRole = (activeGameRoles: Role[]) => {
	if (!activeGameRoles[0]) {
		throw new Error('Missing first role');
	}

	return activeGameRoles[0];
};

export const getNextGameRole = derived(activeGameRoles, (activeGameRoles) => (role: Role): Role => {
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
});

export const getPrevGameRole = derived(
	activeGameRoles,
	(activeGameRoles) =>
		(role: Role): Role | undefined => {
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
		}
);

export const showRole = (role?: Role) => {
	gameStore.updateStore({ currentRole: role });
};

const getRole = (name: string): Role => {
	const { roles } = get(gameStore);

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
