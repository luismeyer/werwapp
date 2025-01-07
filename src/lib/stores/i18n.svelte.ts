import { browser } from '$app/environment';
import { cookies } from '$lib/cookies';

export type Locale = 'en' | 'de';

export const locales: Locale[] = ['en', 'de'];

export const isLocale = (input?: string): input is Locale => input === 'de' || input === 'en';

export const LOCALE_KEY = 'locale';

const init = (): LocaleState => {
	if (!browser) {
		return { locale: 'de' };
	}

	const customLocale = cookies.get(LOCALE_KEY);
	const navigatorLocale = navigator.language.split('-')[0];

	const storedLocale = customLocale ?? navigatorLocale;
	const defaultLocale = 'de';

	return { locale: isLocale(storedLocale) ? storedLocale : defaultLocale };
};

type LocaleState = {
	locale: Locale;
};

export const localeState = $state<LocaleState>(init());

$effect.root(() => {
	$effect(() => {
		cookies.set(LOCALE_KEY, localeState.locale);
	});
});
