import { browser } from '$app/environment';
import { cookies } from '$lib/cookies';
import type { Themes } from '../../const/themes';

export type Theme = (typeof Themes)[number];

export const THEME_KEY = 'theme';

const ThemeStateDefault = {
	lightTheme: 'light',
	darkTheme: 'dark',
	autoSwitching: true
};

function init() {
	if (!browser) {
		return ThemeStateDefault;
	}

	const storageString = cookies.get(THEME_KEY);
	if (!storageString) {
		return ThemeStateDefault;
	}

	return JSON.parse(storageString);
}

export type ThemeState = {
	lightTheme: Theme;
	darkTheme: Theme;
	autoSwitching: boolean;
};

export const themeState = $state<ThemeState>(init());

$effect.root(() => {
	$effect(() => {
		cookies.set(THEME_KEY, JSON.stringify(themeState));
	});
});
