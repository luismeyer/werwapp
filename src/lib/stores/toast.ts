import { get, writable } from 'svelte/store';
import { t } from './i18n';

import { playerStore } from './player';

export type Toast = SongToast | ErrorToast;

export type SongToast = {
	href: string;
	text: string;
};

export type ErrorToast = {
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

const showToast = (toast: Toast, delay?: number) => {
	toastStore.addToast(toast);

	if (delay) {
		setTimeout(() => toastStore.removeToast(toast), delay);
	}
};

export const showCurrentSongToast = (): Toast | undefined => {
	const { currentPhaseSong: currentSong } = get(playerStore);

	if (!currentSong) {
		return;
	}

	const tFunc = get(t);

	showToast(
		{
			href: currentSong.songPage,
			text: tFunc('song.title', { song: currentSong.title, artist: currentSong.artist })
		},
		2000
	);
};

export const showErrorToast = () => {
	const tFunc = get(t);

	// Remove current error message, as by now there only exist one type.
	update((toasts) => toasts.filter((t) => 'href' in t));

	showToast({ text: tFunc('game.loadError') });
};
