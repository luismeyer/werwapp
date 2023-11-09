import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Options<T> = {
	createStorageKey: () => string;
	fetchValue: () => Promise<T>;
};

export function createAsyncStore<T>({ createStorageKey, fetchValue }: Options<T>) {
	function readValueFromStorage(): T | undefined {
		if (!browser) {
			return undefined;
		}

		const stored = localStorage.getItem(createStorageKey());

		if (!stored) {
			return undefined;
		}

		return JSON.parse(stored);
	}

	function writeValueToStorage(value: T) {
		if (!browser) {
			return;
		}

		localStorage.setItem(createStorageKey(), JSON.stringify(value));
	}

	const inMemoryCache = new Map<string, T>();

	const intialValue = readValueFromStorage();
	const store = writable<T | undefined>(intialValue);

	async function revalidate() {
		const storageKey = createStorageKey();
		const cached = inMemoryCache.get(storageKey);

		if (cached) {
			store.set(cached);
			return;
		}

		const value = await fetchValue();

		inMemoryCache.set(storageKey, value);
		writeValueToStorage(value);

		store.set(value);
	}

	return {
		store,
		revalidate
	};
}
