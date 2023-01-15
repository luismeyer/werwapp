import { de } from './de';
import { en } from './en';

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
	'settings.daytheme': string;
	'settings.nighttheme': string;
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
	'game.load': string;
	'game.start': string;
	'song.title': string;
};

export type Locale = 'en' | 'de';

export const locales: Locale[] = ['en', 'de'];

export type I18n = Record<Locale, Translations>;

export const translations: I18n = {
	en,
	de
};
