import { get, writable } from 'svelte/store';

import { browser } from '$app/environment';
import { releaseWakeLock, requestWakeLock } from '$lib/wakelock';

type WakeLockStore =
	| {
			state: 'enabled';
			wakeLockSentinel: WakeLockSentinel;
	  }
	| {
			state: 'disabled';
	  };

const WAKELOCK_STORAGE_KEY = 'werwapp-wakelock';

const getStorageWakeLock = (): WakeLockStore['state'] => {
	if (!browser) {
		return 'disabled';
	}

	const storeageItem = localStorage.getItem(WAKELOCK_STORAGE_KEY) ?? '';

	return storeageItem === 'enabled' ? 'enabled' : 'disabled';
};

export function createWakeLockStore() {
	const { subscribe, set } = writable<WakeLockStore>({
		state: 'disabled'
	});

	const enable = async () => {
		const store = get(wakeLockStore);

		if (store.state === 'enabled') {
			return;
		}

		const wakeLockSentinel = await requestWakeLock();
		if (!wakeLockSentinel) {
			return { state: 'disabled' };
		}

		set({ state: 'enabled', wakeLockSentinel });
		localStorage.setItem(WAKELOCK_STORAGE_KEY, 'enabled');
	};

	const disable = async () => {
		const store = get(wakeLockStore);

		if (store.state === 'disabled') {
			return;
		}

		await releaseWakeLock(store.wakeLockSentinel);

		set({ state: 'disabled' });
		localStorage.setItem(WAKELOCK_STORAGE_KEY, 'disabled');
	};

	return {
		subscribe,
		set,
		enable,
		disable,
		update: (state: WakeLockStore['state']) => {
			if (state === 'enabled') {
				enable();
			}

			if (state === 'disabled') {
				disable();
			}
		}
	};
}

export const wakeLockStore = createWakeLockStore();

export function mountWakeLock() {
	const defaultValue = getStorageWakeLock();
	wakeLockStore.update(defaultValue);
}
