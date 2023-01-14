import { get, writable } from 'svelte/store';
import { playerStore } from './player';

export type Toast = {
	href: string;
	text: string;
};

const { subscribe, update } = writable<Toast | undefined>();

export const toastStore = {
	subscribe,
	setToast: (toast?: Toast) => {
		update(() => toast);
	}
};

export const showToast = (toast: Toast) => {
	toastStore.setToast(toast);

	setTimeout(() => toastStore.setToast(undefined), 2000);
};

export const showCurrentSongToast = (): Toast | undefined => {
	const { currentSong } = get(playerStore);

	if (!currentSong) {
		return;
	}

	showToast({
		href: currentSong.songPage,
		text: `${currentSong.title} von ${currentSong?.artist}`
	});
};
