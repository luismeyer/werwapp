import { GAME_KEY } from '$lib/stores/game.svelte';
import { isLocale, LOCALE_KEY } from '$lib/stores/i18n.svelte';
import { THEME_KEY } from '$lib/stores/theme.svelte';
import { WAKELOCK_KEY } from '$lib/stores/wakelock.svelte';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const locale = cookies.get(LOCALE_KEY);

	return {
		locale: isLocale(locale) ? locale : 'de',
		wakelock: cookies.get(WAKELOCK_KEY),
		theme: cookies.get(THEME_KEY),
		game: cookies.get(GAME_KEY)
	};
};
