import { get, writable } from 'svelte/store';

import type { Song } from '../song';
import { t } from './translations';

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

	const tFunc = get(t);

	toastStore.addToast(id, {
		href: song.songPage,
		text: tFunc('song.title', { song: song.title, artist: song.artist })
	});

	setTimeout(() => toastStore.removeToast(id), 2000);
};

export const showErrorToast = () => {
	const tFunc = get(t);

	toastStore.addToast(123, { text: tFunc('game.loadError') });
};
