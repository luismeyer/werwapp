export const DarkThemes = [
	'dark',
	'synthwave',
	'halloween',
	'forest',
	'aqua',
	'black',
	'luxury',
	'dracula',
	'business',
	'night',
	'coffee'
] as const;

export const LightThemes = [
	'light',
	'cupcake',
	'bumblebee',
	'emerald',
	'corporate',
	'retro',
	'cyberpunk',
	'valentine',
	'garden',
	'lofi',
	'pastel',
	'fantasy',
	'wireframe',
	'cmyk',
	'autumn',
	'acid',
	'lemonade',
	'coffee',
	'winter'
] as const;

export const Themes = [...DarkThemes, ...LightThemes] as const;
