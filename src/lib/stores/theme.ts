import { writable } from 'svelte/store';

export function createThemeStore() {
	const { subscribe, set, update } = writable<ThemeData>({
		lightTheme: 'light',
		darkTheme: 'dark',
		autoSwitching: true
	});

	return {
		subscribe,
		setLightTheme: (newTheme: string) =>
			update((currentState) => ({ ...currentState, lightTheme: newTheme })),
		setDarkTheme: (newTheme: string) =>
			update((currentState) => ({ ...currentState, darkTheme: newTheme })),
		setAutoSwitching: (mode: boolean) =>
			update((currentState) => ({ ...currentState, autoSwitching: mode })),
		reset: () =>
			set({
				lightTheme: 'light',
				darkTheme: 'dark',
				autoSwitching: true
			})
	};
}

export const themeStore = createThemeStore();
export const themes = [
	'light',
	'dark',
	'cupcake',
	'bumblebee',
	'emerald',
	'corporate',
	'synthwave',
	'retro',
	'cyberpunk',
	'valentine',
	'halloween',
	'garden',
	'forest',
	'aqua',
	'lofi',
	'pastel',
	'fantasy',
	'wireframe',
	'black',
	'luxury',
	'dracula',
	'cmyk',
	'autumn',
	'business',
	'acid',
	'lemonade',
	'night',
	'coffee',
	'winter'
];

type ThemeData = {
	lightTheme: string;
	darkTheme: string;
	autoSwitching: boolean;
};
