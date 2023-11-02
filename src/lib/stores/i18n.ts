import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Locale = 'en' | 'de';

export const locales: Locale[] = ['en', 'de'];

const isLocale = (input?: string): input is Locale => input === 'de' || input === 'en';

const LOCALE_STORAGE_KEY = 'locale';

export const initialLocale = () => {
	const customLocale = browser ? localStorage.getItem(LOCALE_STORAGE_KEY) : undefined;
	const navigatorLocale = browser ? navigator.language.split('-')[0] : undefined;

	const defaultLocale = 'de';
	const storedLocale = customLocale ?? navigatorLocale;

	return isLocale(storedLocale) ? storedLocale : defaultLocale;
};

const { subscribe, set } = writable<Locale>(initialLocale());
export const localeStore = { subscribe, updateLocale: (locale: Locale) => set(locale) };

subscribe(async (value) => {
	if (!browser) {
		return;
	}

	localStorage.setItem(LOCALE_STORAGE_KEY, value);
});
