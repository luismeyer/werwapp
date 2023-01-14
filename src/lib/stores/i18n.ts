import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import { translations, type Locale, type Translations } from '../translations/translations';

const isLocale = (input?: string): input is Locale => input === 'de' || input === 'en';

const LOCALE_STORAGE_KEY = 'locale';

const customLocale = browser ? localStorage.getItem(LOCALE_STORAGE_KEY) : undefined;
const navigatorLocale = browser ? navigator.language.split('-')[0] : undefined;

const defaultLocale = 'de';
const storedLocale = customLocale ?? navigatorLocale;

const { subscribe, update } = writable<Locale>(
	isLocale(storedLocale) ? storedLocale : defaultLocale
);

const updateLocale = (input: Locale) => {
	update(() => input);
};

export const i18nStore = { subscribe, updateLocale };

subscribe((value) => {
	if (!browser) {
		return;
	}

	localStorage.setItem(LOCALE_STORAGE_KEY, value);
});

function translate(locale: Locale, key: keyof Translations, vars: Record<string, string>) {
	// Let's throw some errors if we're trying to use keys/locales that don't exist.
	// We could improve this by using Typescript and/or fallback values.
	if (!key) throw new Error('no key provided to $t()');
	if (!locale) throw new Error(`no translation for key "${key}"`);

	// Grab the translation from the translations object.
	let text = translations[locale][key];

	if (!text) throw new Error(`no translation found for ${locale}.${key}`);

	// Replace any passed in variables in the translation string.
	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const t = derived(
	i18nStore,
	($locale) =>
		(key: keyof Translations, vars = {}) =>
			translate($locale, key, vars)
);
