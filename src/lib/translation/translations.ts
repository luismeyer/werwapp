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
	'settings.qa': string;
	'settings.support': string;
	night: string;
	day: string;
	game: string;
	settings: string;
	en: string;
	de: string;
	counter: string;
	state: string;
	'support.headline': string;
	'support.sound': string;
	'support.play': string;
	'support.no': string;
	'support.welcome': string;
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
		'settings.qa': 'Any Questions?',
		'settings.support': 'Support pls!',
		counter: 'Nacht',
		state: 'state',
		'support.headline': 'Welcome to the Support-Chat',
		'support.welcome': '👋 hey. You can ask me anything',
		'support.sound':
			'If you are on an Iphone you have to deactivate the silent mode. Otherwise have you tried turning it off and on again?',
		'support.play':
			'To use this App you just have to click on either the moon or sun to change the current Phase. The music will change automatically',
		'support.no': 'I have no answer to this'
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
		'settings.qa': 'Hast du Fragen?',
		'settings.support': 'Hilfe bitte!',
		en: 'Englisch',
		de: 'Deutsch',
		'game.name': 'Werwapp',
		counter: 'Night',
		state: 'Status',
		'support.headline': 'Willkommen im Support-Chat',
		'support.welcome': '👋 hey. Frag mich egal was',
		'support.sound':
			'Wenn du ein Iphone hast musst du den Stummmodus deaktivieren. An sonsten hast du versucht dein Gerät neu zu start?',
		'support.play':
			'Um zu spielen muss du nur entweder auf den Mond oder die Sonne klicken um die aktuelle Phase zu ändern. Dann wechselt die Musik automatisch',
		'support.no': 'Darauf habe ich keine antwort'
	}
};
