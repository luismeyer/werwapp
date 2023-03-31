import type { Role } from './game';

// This also defined the order of the Roles
export const RoleDefinitions: Role[] = [
	{
		name: 'night'
	},
	{
		name: 'amor',
		amount: 1,
		prefix: 'masculinum'
	},
	{
		name: 'werewolf',
		amount: 1,
		prefix: 'masculinum'
	},
	{
		name: 'girl',
		amount: 1,
		combinedWith: 'werewolf',
		prefix: 'neutrum'
	},
	{
		name: 'witch',
		amount: 1,
		prefix: 'feminimum'
	},
	{
		name: 'seer',
		amount: 1,
		prefix: 'feminimum'
	},
	{
		name: 'day'
	},
	{
		name: 'hunter',
		amount: 1,
		prefix: 'masculinum'
	},
	{
		name: 'villager',
		amount: 1,
		prefix: 'feminimum'
	}
];
