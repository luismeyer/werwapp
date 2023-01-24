import { writable } from 'svelte/store';

import { browser } from '$app/environment';
import { requestWakeLock } from '$lib/wakelock';

type WakeLockStore =
	| {
			state: 'enabled';
			wakeLockSentinel: WakeLockSentinel;
	  }
	| {
			state: 'disabled';
	  };

const WAKELOCK_STORAGE_KEY = 'wakelock';

const getStorageWakeLock = (): WakeLockStore['state'] => {
	const storeageItem = localStorage.getItem(WAKELOCK_STORAGE_KEY) ?? '';

	return storeageItem === 'enabled' ? 'enabled' : 'disabled';
};

export const mountWakeLock = async () => {
	const storage = getStorageWakeLock();

	if (storage !== 'enabled') {
		wakeLockStore.update({ state: 'disabled' });
		return;
	}

	const wakeLockSentinel = await requestWakeLock();
	if (!wakeLockSentinel) {
		wakeLockStore.update({ state: 'disabled' });
		return;
	}

	wakeLockStore.update({ state: 'enabled', wakeLockSentinel });
};

export function createWakeLockStore() {
	const init: WakeLockStore = {
		state: 'disabled'
	};

	const { subscribe, update } = writable<WakeLockStore>(init);

	return {
		subscribe,
		update: (newState: WakeLockStore) => update(() => newState)
	};
}

export const wakeLockStore = createWakeLockStore();

wakeLockStore.subscribe((value) => {
	if (!browser) {
		return;
	}

	localStorage.setItem(WAKELOCK_STORAGE_KEY, value.state);
});
