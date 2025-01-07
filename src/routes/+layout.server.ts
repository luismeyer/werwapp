import { isLocale, LOCALE_KEY } from '$lib/stores/i18n.svelte';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const locale = cookies.get(LOCALE_KEY);

	return {
		locale: isLocale(locale) ? locale : 'de'
	};
};
