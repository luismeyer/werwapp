import type { Song } from '../song';
import { t } from './translations.svelte';

export type Toast = SongToast | ErrorToast;

export type SongToast = {
	href: string;
	text: string;
};

export type ErrorToast = {
	text: string;
};

export const toastState = $state<Record<number, Toast>>({});

export const showSongToast = (song?: Song): Toast | undefined => {
	if (!song) {
		return;
	}

	const id = Date.now();

	toastState[id] = {
		href: song.songPage,
		text: t('song.title', { song: song.title, artist: song.artist })
	};

	setTimeout(() => {
		delete toastState[id];
	}, 2000);
};

export const showErrorToast = () => {
	toastState[123] = {
		text: t('game.loadError')
	};
};
