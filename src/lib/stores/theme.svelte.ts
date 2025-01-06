import { browser } from '$app/environment';

const THEME_STORAGE_KEY = 'theme';

function init() {
	const fallback = {
		lightTheme: 'light',
		darkTheme: 'dark',
		autoSwitching: true
	};

	if (!browser) {
		return fallback;
	}

	const storageString = localStorage.getItem(THEME_STORAGE_KEY);
	if (!storageString) {
		return fallback;
	}

	return JSON.parse(storageString);
}

type Theme = {
	lightTheme: string;
	darkTheme: string;
	autoSwitching: boolean;
};

export const themeState = $state<Theme>(init());

$effect.root(() => {
	$effect(() => {
		if (!themeState) {
			return;
		}

		localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeState));
	});
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
