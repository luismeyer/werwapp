export type PlayerRoleDef = {
	id: string;
	type: 'player';
	state: 'day' | 'night';
	image: string;
	name: string;
	addable: boolean;
	combinedWith?: string;
	prefix: 'feminimum' | 'masculinum' | 'neutrum';
	isEvil: boolean;
	activeNights?: number[];
	order: number;
};

export type UtilityRoleDef = {
	id: string;
	type: 'util';
	state: 'day' | 'night';
	name: string;
	order: number;
};

type RoleDef = PlayerRoleDef | UtilityRoleDef;

export const RoleDefinitions: Record<string, RoleDef> = {
	'8613e9de': {
		id: '8613e9de',
		type: 'util',
		state: 'night',
		name: 'night',
		order: 0
	},
	b512eaf4: {
		id: 'b512eaf4',
		type: 'player',
		image: '/roles/thief.png',
		state: 'night',
		name: 'thief',
		addable: false,
		prefix: 'masculinum',
		isEvil: false,
		order: 1
	},
	'9de93fb7': {
		id: '9de93fb7',
		type: 'player',
		image: '/roles/amor.png',
		state: 'night',
		name: 'amor',
		addable: false,
		prefix: 'masculinum',
		isEvil: false,
		activeNights: [1],
		order: 2
	},
	'03be69e0': {
		id: '03be69e0',
		type: 'player',
		image: '/roles/werewolf.png',
		state: 'night',
		name: 'werewolf',
		addable: true,
		combinedWith: 'none',
		prefix: 'masculinum',
		isEvil: true,
		order: 3
	},
	'15dff4b1': {
		id: '15dff4b1',
		type: 'player',
		image: '/roles/girl.png',
		state: 'night',
		name: 'girl',
		addable: false,
		combinedWith: 'werewolf',
		prefix: 'neutrum',
		isEvil: false,
		order: 4
	},
	'4b51b239': {
		id: '4b51b239',
		type: 'player',
		image: '/roles/witch.png',
		state: 'night',
		name: 'witch',
		addable: false,
		prefix: 'feminimum',
		isEvil: false,
		order: 5
	},
	ba12b9ba: {
		id: 'ba12b9ba',
		type: 'player',
		image: '/roles/seer.png',
		state: 'night',
		name: 'seer',
		addable: false,
		prefix: 'feminimum',
		isEvil: false,
		order: 6
	},
	b532caf3: {
		id: 'b532caf3',
		type: 'util',
		state: 'day',
		name: 'day',
		order: 7
	},
	'314e331c': {
		id: '314e331c',
		type: 'player',
		image: '/roles/hunter.png',
		state: 'day',
		name: 'hunter',
		addable: false,
		prefix: 'masculinum',
		isEvil: false,
		order: 8
	},
	'9a757abb': {
		id: '9a757abb',
		type: 'player',
		image: '/roles/villager.png',
		state: 'day',
		name: 'villager',
		addable: true,
		prefix: 'feminimum',
		isEvil: false,
		order: 9
	}
};
