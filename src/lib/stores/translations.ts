import { derived, get } from 'svelte/store';
import { localeStore } from './i18n';
import { createAsyncStore } from './async-store';
import { fetchAdmin } from '$lib/blob';

const { revalidate, store } = createAsyncStore<Record<string, string>>({
	createStorageKey: () => {
		const locale = get(localeStore);
		return `werwapp-translations-${locale}`;
	},
	async fetchValue() {
		const locale = get(localeStore);
		return fetchAdmin(`/translations/${locale}`);
	}
});

localeStore.subscribe(async () => {
	await revalidate();
});

export const t = derived(
	store,
	(translations = {}) =>
		(key: string, vars: Record<string, string> = {}) => {
			// Grab the translation from the translations object.
			let text = translations[key];

			if (!text || window.location.search.includes('debug')) {
				return key;
			}

			// Replace any passed in variables in the translation string.
			Object.entries(vars).map(([key, value]) => {
				const regex = new RegExp(`{{${key}}}`, 'g');

				text = text?.replace(regex, value);
			});

			return text;
		}
);
