import { get, writable } from 'svelte/store';
import { t } from './i18n';

import { playerStore } from './player';

export type Toast = {
	href: string;
	text: string;
};

const { subscribe, update } = writable<Toast[]>([]);

export const toastStore = {
	subscribe,
	addToast: (toast: Toast) => {
		update((toasts) => [...toasts, toast]);
	},
	removeToast: (toast: Toast) => {
		update((toasts) => toasts.filter((t) => t !== toast));
	}
};

export const showToast = (toast: Toast) => {
	toastStore.addToast(toast);

	setTimeout(() => toastStore.removeToast(toast), 2000);
};

export const showCurrentSongToast = (): Toast | undefined => {
	const { currentPhaseSong: currentSong } = get(playerStore);

	if (!currentSong) {
		return;
	}

	const tFunc = get(t);

	showToast({
		href: currentSong.songPage,
		text: tFunc('song.title', { song: currentSong.title, artist: currentSong.artist })
	});
};
