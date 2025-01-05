import { browser } from '$app/environment';

export type Locale = 'en' | 'de';

export const locales: Locale[] = ['en', 'de'];

const isLocale = (input?: string): input is Locale => input === 'de' || input === 'en';

const LOCALE_STORAGE_KEY = 'locale';

const init = (): LocaleState => {
	if (!browser) {
		return { locale: 'de' };
	}

	const customLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
	const navigatorLocale = navigator.language.split('-')[0];

	const defaultLocale = 'de';
	const storedLocale = customLocale ?? navigatorLocale;

	return { locale: isLocale(storedLocale) ? storedLocale : defaultLocale };
};

type LocaleState = {
	locale: Locale;
};

export const localeState = $state<LocaleState>(init());

$effect.root(() => {
	$effect(() => {
		localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(localeState));
	});
});
