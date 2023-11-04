import type { Role } from './game';

// This also defined the order of the Roles
export const RoleDefinitions: Role[] = [
	{
		name: 'night',
		state: 'night',
		type: 'util'
	},
	{
		name: 'amor',
		type: 'player',
		state: 'night',
		amount: 1,
		prefix: 'masculinum',
		isEvil: false,
		addable: false,
		activeNights: [1]
	},
	{
		name: 'werewolf',
		type: 'player',
		state: 'night',
		amount: 1,
		prefix: 'masculinum',
		isEvil: true,
		addable: true
	},
	{
		name: 'girl',
		type: 'player',
		state: 'night',
		amount: 1,
		combinedWith: 'werewolf',
		prefix: 'neutrum',
		isEvil: false,
		addable: false
	},
	{
		name: 'witch',
		type: 'player',
		state: 'night',
		amount: 1,
		prefix: 'feminimum',
		isEvil: false,
		addable: false
	},
	{
		name: 'seer',
		type: 'player',
		state: 'night',
		amount: 1,
		prefix: 'feminimum',
		isEvil: false,
		addable: false
	},
	{
		name: 'day',
		state: 'day',
		type: 'util'
	},
	{
		name: 'hunter',
		type: 'player',
		state: 'day',
		amount: 1,
		prefix: 'masculinum',
		isEvil: false,
		addable: false
	},
	{
		name: 'villager',
		type: 'player',
		state: 'day',
		amount: 1,
		prefix: 'feminimum',
		isEvil: false,
		addable: true
	}
];
