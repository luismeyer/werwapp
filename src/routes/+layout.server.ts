import { GAME_KEY, parseGameState } from '$lib/stores/game.svelte';
import { isLocale, LOCALE_KEY } from '$lib/stores/i18n.svelte';
import { THEME_KEY } from '$lib/stores/theme.svelte';
import { WAKELOCK_KEY } from '$lib/stores/wakelock.svelte';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies, route, untrack }) => {
	const locale = cookies.get(LOCALE_KEY);

	const game = cookies.get(GAME_KEY);

	untrack(() => {
		if (game) {
			const parsedGame = parseGameState(game);

			if (
				parsedGame.state === 'running' &&
				route.id !== '/game' &&
				route.id !== '/narrator' &&
				route.id !== '/settings'
			) {
				redirect(301, '/game');
			}

			if (
				parsedGame.state !== 'running' &&
				route.id !== '/' &&
				route.id !== '/narrator' &&
				route.id !== '/settings'
			)
				redirect(301, '/');
		}
	});

	return {
		locale: isLocale(locale) ? locale : 'de',
		wakelock: cookies.get(WAKELOCK_KEY),
		theme: cookies.get(THEME_KEY),
		game
	};
};
