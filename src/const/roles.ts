import amorImage from "./roles/amor.png";
import bitchImage from "./roles/bitch.png";
import girlImage from "./roles/girl.png";
import hunterImage from "./roles/hunter.png";
import seerImage from "./roles/seer.png";
import thiefImage from "./roles/thief.png";
import villagerImage from "./roles/villager.png";
import werewolfImage from "./roles/werewolf.png";
import witchImage from "./roles/witch.png";

export type PlayerRoleDef = {
	id: string;
	type: "player";
	state: "day" | "night";
	image: string;
	name: string;
	addable: boolean;
	combinedWith?: string;
	prefix: "feminimum" | "masculinum" | "neutrum";
	isEvil: boolean;
	activeNights?: number[];
};

export type UtilityRoleDef = {
	id: string;
	type: "util";
	state: "day" | "night";
	name: string;
};

type RoleDef = PlayerRoleDef | UtilityRoleDef;

export const RoleDefinitions: RoleDef[] = [
	{
		id: "8613e9de",
		type: "util",
		state: "night",
		name: "night",
	},
	{
		id: "9de93fb7",
		type: "player",
		image: amorImage,
		state: "night",
		name: "amor",
		addable: false,
		prefix: "masculinum",
		isEvil: false,
		activeNights: [0, 1],
	},
	{
		id: "t77wuhfbiu4uy2789",
		type: "player",
		image: bitchImage,
		state: "night",
		name: "bitch",
		addable: false,
		prefix: "feminimum",
		isEvil: false,
	},
	{
		id: "03be69e0",
		type: "player",
		image: werewolfImage,
		state: "night",
		name: "werewolf",
		addable: true,
		combinedWith: "none",
		prefix: "masculinum",
		isEvil: true,
	},
	{
		id: "15dff4b1",
		type: "player",
		image: girlImage,
		state: "night",
		name: "girl",
		addable: false,
		combinedWith: "werewolf",
		prefix: "neutrum",
		isEvil: false,
	},
	{
		id: "4b51b239",
		type: "player",
		image: witchImage,
		state: "night",
		name: "witch",
		addable: false,
		prefix: "feminimum",
		isEvil: false,
	},
	{
		id: "ba12b9ba",
		type: "player",
		image: seerImage,
		state: "night",
		name: "seer",
		addable: false,
		prefix: "feminimum",
		isEvil: false,
	},
	{
		id: "b512eaf4",
		type: "player",
		image: thiefImage,
		state: "night",
		name: "thief",
		addable: false,
		prefix: "masculinum",
		isEvil: false,
	},
	{
		id: "b532caf3",
		type: "util",
		state: "day",
		name: "day",
	},
	{
		id: "314e331c",
		type: "player",
		image: hunterImage,
		state: "day",
		name: "hunter",
		addable: false,
		prefix: "masculinum",
		isEvil: false,
	},
	{
		id: "9a757abb",
		type: "player",
		image: villagerImage,
		state: "day",
		name: "villager",
		addable: true,
		prefix: "feminimum",
		isEvil: false,
	},
];
