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

export const RolesDefinition: RoleDef[] = [
	{
		id: '1700350996665',
		type: 'player',
		image: '/roles/thief.png',
		state: 'night',
		name: 'thief',
		addable: false,
		prefix: 'masculinum',
		isEvil: false,
		order: 1
	},
	{
		id: '8613e9de-2405-4989-828c-0ee1b0acfae6',
		type: 'util',
		state: 'night',
		name: 'night',
		order: 0
	},
	{
		id: '9de93fb7-659a-4ae7-9ec3-20dc233f9611',
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
	{
		id: '03be69e0-5ede-4496-a556-11af158c1bb6',
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
	{
		id: '15dff4b1-b6a8-4636-9dee-f6e57dbbaa01',
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
	{
		id: '4b51b239-c2b4-4b00-a4c5-6dad173fb595',
		type: 'player',
		image: '/roles/witch.png',
		state: 'night',
		name: 'witch',
		addable: false,
		prefix: 'feminimum',
		isEvil: false,
		order: 5
	},
	{
		id: 'ba12b9ba-db5f-4d29-8a7b-285d6d981e19',
		type: 'player',
		image: '/roles/seer.png',
		state: 'night',
		name: 'seer',
		addable: false,
		prefix: 'feminimum',
		isEvil: false,
		order: 6
	},
	{
		id: 'b532caf3-2b3e-47c1-a5a7-337aa9c88c76',
		type: 'util',
		state: 'day',
		name: 'day',
		order: 7
	},
	{
		id: '314e331c-ee16-4bef-b638-a3d78d4fcc18',
		type: 'player',
		image: '/roles/hunter.png',
		state: 'day',
		name: 'hunter',
		addable: false,
		prefix: 'masculinum',
		isEvil: false,
		order: 8
	},
	{
		id: '9a757abb-245d-4489-963f-c8b5ac7ed058',
		type: 'player',
		image: '/roles/villager.png',
		state: 'day',
		name: 'villager',
		addable: true,
		prefix: 'feminimum',
		isEvil: false,
		order: 9
	}
];
