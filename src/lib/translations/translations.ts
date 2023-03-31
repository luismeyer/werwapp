import { de } from './de';
import { en } from './en';

export type Translations = {
	'about.title': string;
	'about.github': string;
	'about.licenses.title': string;
	'about.licenses.loading': string;
	'about.licenses.description': string;
	'about.licenses.project': string;

	'game.name': string;

	'settings.discribtion': string;
	'settings.theme.toggle': string;
	'settings.qa': string;
	'settings.support': string;
	'settings.daytheme': string;
	'settings.nighttheme': string;
	'settings.about.label': string;
	'settings.about.button': string;
	'settings.reset': string;
	'settings.wakelock': string;

	'reset.headline': string;
	'reset.body': string;
	'reset.yes': string;
	'reset.no': string;
	night: string;
	day: string;
	game: string;
	settings: string;
	rules: string;
	en: string;
	de: string;
	state: string;

	'support.headline': string;
	'support.sound': string;
	'support.play': string;
	'support.no': string;
	'support.welcome': string;
	'support.screenlock': string;

	'game.load': string;
	'game.start': string;
	'song.title': string;

	'narrator.selected': string;
	'narrator.next': string;
	'narrator.prev': string;
	'narrator.close': string;
	'narrator.music.button': string;
	'narrator.headline.day': string;
	'narrator.headline.night': string;
	'narrator.headline.plural': string;
	'narrator.headline.singular.feminimum': string;
	'narrator.headline.singular.masculinum': string;
	'narrator.headline.singular.neutrum': string;
	'narrator.amor.name': string;
	'narrator.amor.name.plural': string;
	'narrator.amor.description': string;
	'narrator.hunter.name': string;
	'narrator.hunter.name.plural': string;
	'narrator.hunter.description': string;
	'narrator.villager.name': string;
	'narrator.villager.name.plural': string;
	'narrator.villager.description': string;
	'narrator.seer.name': string;
	'narrator.seer.name.plural': string;
	'narrator.seer.description': string;
	'narrator.werewolf.name': string;
	'narrator.werewolf.name.plural': string;
	'narrator.werewolf.description': string;
	'narrator.witch.name': string;
	'narrator.witch.name.plural': string;
	'narrator.witch.description': string;
	'narrator.girl.name': string;
	'narrator.girl.name.plural': string;
	'narrator.girl.description': string;
};

export type Locale = 'en' | 'de';

export const locales: Locale[] = ['en', 'de'];

export type I18n = Record<Locale, Translations>;

export const translations: I18n = {
	en,
	de
};
