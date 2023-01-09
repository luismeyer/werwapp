import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const THEME_STORAGE_KEY = 'theme';

export function createThemeStore() {
	const storageString = browser && localStorage.getItem(THEME_STORAGE_KEY);

	const defaultData = {
		lightTheme: 'light',
		darkTheme: 'dark',
		autoSwitching: true
	};

	const { subscribe, update } = writable<ThemeData>(
		storageString ? JSON.parse(storageString) : defaultData
	);

	return {
		subscribe,
		setLightTheme: (newTheme: string) =>
			update((currentState) => ({ ...currentState, lightTheme: newTheme })),
		setDarkTheme: (newTheme: string) =>
			update((currentState) => ({ ...currentState, darkTheme: newTheme })),
		setAutoSwitching: (mode: boolean) =>
			update((currentState) => ({ ...currentState, autoSwitching: mode }))
	};
}

export const themeStore = createThemeStore();

themeStore.subscribe((value) => {
	if (browser) {
		localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(value));
	}
});

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
