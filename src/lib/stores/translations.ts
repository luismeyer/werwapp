import { derived, writable } from 'svelte/store';
import { localeStore, type Locale, initialLocale } from './i18n';
import { browser } from '$app/environment';

// to avoid layout shift when translations are loaded we store them in localstore and update the localstore once they are loaded
const TranslationStorageKey = (key: string) => `werwapp-translations-${key}`;

function readTranslationsFromCache(locale = initialLocale()): Record<string, string> | undefined {
	if (!browser) {
		return undefined;
	}

	const stored = localStorage.getItem(TranslationStorageKey(locale));

	if (!stored) {
		return undefined;
	}

	return JSON.parse(stored);
}

function writeTranslationtToCache(locale: Locale, translations: Record<string, string>) {
	if (!browser) {
		return;
	}

	localStorage.setItem(TranslationStorageKey(locale), JSON.stringify(translations));
}

export const translationStore = writable<Record<string, string>>(readTranslationsFromCache() ?? {});

const inMemoryCache = new Map<Locale, Record<string, string>>();

export async function loadTranslations(locale: Locale) {
	const cached = inMemoryCache.get(locale);
	if (cached) {
		translationStore.set(cached);
		return;
	}

	const storeId = import.meta.env.VITE_BLOB_STORE_ID;

	const translations = await fetch(
		`https://${storeId}.public.blob.vercel-storage.com/translations/${locale}.json`
	).then((res) => res.json());

	inMemoryCache.set(locale, translations);
	writeTranslationtToCache(locale, translations);
	translationStore.set(translations);
}

localeStore.subscribe(async (value) => {
	if (!browser) {
		return;
	}

	await loadTranslations(value);
});

export const t = derived(
	translationStore,
	($translations) =>
		(key: string, vars: Record<string, string> = {}) => {
			// Grab the translation from the translations object.
			let text = $translations[key];

			if (!text) {
				return key;
			}

			// Replace any passed in variables in the translation string.
			Object.keys(vars).map((k) => {
				const regex = new RegExp(`{{${k}}}`, 'g');
				text = text.replace(regex, vars[k]);
			});

			return text;
		}
);
