import { get, writable } from 'svelte/store';
import { browser } from '$app/environment';
import { gameStore } from './gamestore';

const THEME_STORAGE_KEY = 'theme';

const updateThemeOnBody = (theme: string) => {
	document.body.setAttribute('data-theme', theme);
};

const updateThemeInGame = (newState?: ThemeData) => {
	const { autoSwitching, darkTheme, lightTheme } = newState ?? get(themeStore);
	const { gamestate } = get(gameStore);

	const currentTheme = autoSwitching && gamestate === 'day' ? lightTheme : darkTheme;
	updateThemeOnBody(currentTheme);
};

export function createThemeStore() {
	const storageString = browser && localStorage.getItem(THEME_STORAGE_KEY);

	const defaultData: ThemeData = {
		lightTheme: 'light',
		darkTheme: 'dark',
		autoSwitching: true
	};

	const initialData: ThemeData = storageString ? JSON.parse(storageString) : defaultData;

	const { subscribe, update } = writable(initialData);

	if (browser) {
		updateThemeOnBody(initialData.darkTheme);
	}

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
	if (!browser) {
		return;
	}

	localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(value));
	updateThemeInGame();
});

gameStore.subscribe(() => {
	if (!browser) {
		return;
	}

	updateThemeInGame();
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
