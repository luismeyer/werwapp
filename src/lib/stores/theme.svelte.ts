import { cookies } from '$lib/cookies';
import type { Themes } from '../../const/themes';

export type Theme = (typeof Themes)[number];

export const THEME_KEY = 'theme';

const ThemeStateDefault = {
	lightTheme: 'light',
	darkTheme: 'dark',
	autoSwitching: true
} as const;

export type ThemeState = {
	lightTheme: Theme;
	darkTheme: Theme;
	autoSwitching: boolean;
};

export const themeState = $state<ThemeState>(ThemeStateDefault);

export function deserializeThemeState(raw: string) {
	const serializedGameState: ThemeState = JSON.parse(raw);

	themeState.autoSwitching = serializedGameState.autoSwitching;
	themeState.lightTheme = serializedGameState.lightTheme;
	themeState.darkTheme = serializedGameState.darkTheme;
}

$effect.root(() => {
	$effect(() => {
		cookies.set(THEME_KEY, JSON.stringify(themeState));
	});
});
