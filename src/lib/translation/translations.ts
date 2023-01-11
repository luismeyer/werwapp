export type Translations = {
	'role.hunter.name': string;
	'role.villager.name': string;
	'role.armor.name': string;
	'role.visionary.name': string;
	'role.werwolf.name': string;
	'role.vilagehoe.name': string;
	'role.witch.name': string;
	'game.name': string;
	'settings.discribtion': string;
	'settings.theme.toggle': string;
	night: string;
	day: string;
	game: string;
	settings: string;
	en: string;
	de: string;
	counter: string;
	state: string;
};

export type Locale = 'en' | 'de';

export const locales: Locale[] = ['en', 'de'];

export type I18n = Record<Locale, Translations>;

export const translations: I18n = {
	en: {
		'role.hunter.name': 'hunter',
		'role.villager.name': 'villager',
		'role.armor.name': 'armor',
		'role.visionary.name': 'visionary',
		'role.werwolf.name': 'werwolf',
		'role.vilagehoe.name': 'vilagehoe',
		'role.witch.name': 'witch',
		night: 'night',
		day: 'day',
		game: 'Game',
		settings: 'Settings',
		en: 'English',
		de: 'German',
		'game.name': 'Werwapp',
		'settings.discribtion': 'Here you can edit your game settings.',
		'settings.theme.toggle': 'Automatic color scheme',
		counter: 'Nacht',
		state: 'state'
	},
	de: {
		'role.hunter.name': 'Jäger',
		'role.villager.name': 'Dorfbewohner',
		'role.armor.name': 'Amor',
		'role.visionary.name': 'Seherin',
		'role.werwolf.name': 'Werwolf',
		'role.vilagehoe.name': 'Dorfmatratze',
		'role.witch.name': 'Hexe',
		night: 'Nacht',
		day: 'Tag',
		game: 'Spiel',
		settings: 'Einstellungen',
		'settings.discribtion': 'Hier kannst du deine Spieleinstellungen bearbeiten.',
		'settings.theme.toggle': 'Dynamischer Farbschemawechsel',
		en: 'Englisch',
		de: 'Deutsch',
		'game.name': 'Werwapp',
		counter: 'Night',
		state: 'Status'
	}
};
