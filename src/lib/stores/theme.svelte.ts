import { browser } from '$app/environment';

import { gameState } from './game.svelte';

const THEME_STORAGE_KEY = 'theme';

const updateThemeOnBody = (theme: string) => {
	document.documentElement.setAttribute('data-theme', theme);
};

export const themeState = $state({
	lightTheme: 'light',
	darkTheme: 'dark',
	autoSwitching: true
});

function init() {
	if (!browser) {
		return;
	}
	const storageString = localStorage.getItem(THEME_STORAGE_KEY);
	if (!storageString) {
		localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeState));
		return;
	}

	const initialData: ThemeData = JSON.parse(storageString);

	themeState.autoSwitching = initialData.autoSwitching;
	themeState.darkTheme = initialData.darkTheme;
	themeState.lightTheme = initialData.lightTheme;
}

init();

$effect.root(() => {
	if (!themeState.autoSwitching) {
		return;
	}

	const { phase } = gameState;

	const currentTheme = phase === 'day' ? themeState.lightTheme : themeState.darkTheme;
	updateThemeOnBody(currentTheme);
});

// this needs to be in sync with the tailwind.config.js file
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
