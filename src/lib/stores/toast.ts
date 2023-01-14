import { writable } from 'svelte/store';

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
