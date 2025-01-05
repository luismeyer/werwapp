import { writable } from 'svelte/store';

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

const { subscribe, update } = writable<Record<number, Toast>>({});

export const toastStore = {
	subscribe,
	addToast: (id: number, toast: Toast) => {
		update((toasts) => ({ ...toasts, [id]: toast }));
	},
	removeToast: (id: number) => {
		update((toasts) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { [id]: _delete, ...rest } = toasts;

			return rest;
		});
	}
};

export const showSongToast = (song?: Song): Toast | undefined => {
	if (!song) {
		return;
	}

	const id = Date.now();

	toastStore.addToast(id, {
		href: song.songPage,
		text: t('song.title', { song: song.title, artist: song.artist })
	});

	setTimeout(() => toastStore.removeToast(id), 2000);
};

export const showErrorToast = () => {
	toastStore.addToast(123, { text: t('game.loadError') });
};
