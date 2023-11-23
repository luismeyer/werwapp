import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Options<T> = {
	createStorageKey: () => string;
	fetchFunction: (pathname: string) => Promise<unknown>;
	createRequestPathname: () => string;
	parseResponse: (response: unknown) => T;
};

function readValueFromStorage<T>(key: string): T | undefined {
	if (!browser) {
		return undefined;
	}

	const stored = localStorage.getItem(key);

	if (!stored) {
		return undefined;
	}

	return JSON.parse(stored);
}

function writeValueToStorage<T>(key: string, value: T) {
	if (!browser) {
		return;
	}

	localStorage.setItem(key, JSON.stringify(value));
}

export function createAsyncStore<T>({
	createStorageKey,
	createRequestPathname,
	fetchFunction,
	parseResponse
}: Options<T>) {
	const createStorageVersionKey = () => `${createStorageKey()}-version`;
	const getStoredValue = () => readValueFromStorage<T>(createStorageKey());

	const inMemoryCache = new Map<string, T>();

	const store = writable<T | undefined>(getStoredValue());

	async function fetchVersion() {
		const requestPathname = `version${createRequestPathname()}`;
		return fetchFunction(requestPathname);
	}

	async function fetchValue() {
		const storageVersionKey = createStorageVersionKey();

		const version = await fetchVersion();
		const currentVersion = readValueFromStorage(storageVersionKey);

		if (version === currentVersion) {
			const storedValue = getStoredValue();
			if (!storedValue) {
				throw new Error('No stored value found, event though the version matched');
			}

			return storedValue;
		}

		const requestPathname = createRequestPathname();
		const response = await fetchFunction(requestPathname);

		const result = parseResponse(response);

		writeValueToStorage(storageVersionKey, version);

		return result;
	}

	async function revalidate() {
		const storageKey = createStorageKey();
		const cached = inMemoryCache.get(storageKey);

		if (cached) {
			store.set(cached);
			return;
		}

		const value = await fetchValue();

		inMemoryCache.set(storageKey, value);
		writeValueToStorage(storageKey, value);

		store.set(value);
	}

	return {
		store,
		revalidate
	};
}
