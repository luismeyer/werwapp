export type Song = {
	title: string;
	internalUrl: string;
	artist: string;
};

export type Songs = {
	daySongs: Song[];
	nightSongs: Song[];
};
