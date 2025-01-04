import { derived } from 'svelte/store';
import { localeStore } from './i18n';
import { EN } from '../../const/en';
import { DE } from '../../const/de';

export type Translations = {
	'about.title': string;
	'about.github': string;
	'about.licenses.title': string;
	'about.licenses.loading': string;
	'about.licenses.description': string;
	'about.licenses.project': string;
	night: string;
	day: string;
	game: string;
	settings: string;
	rules: string;
	en: string;
	de: string;
	'game.name': string;
	'settings.discribtion': string;
	'settings.theme.toggle': string;
	'settings.daytheme': string;
	'settings.nighttheme': string;
	'settings.qa': string;
	'settings.support': string;
	'settings.about.label': string;
	'settings.about.button': string;
	'settings.reset': string;
	'settings.wakelock': string;
	state: string;
	'support.headline': string;
	'support.welcome': string;
	'support.sound': string;
	'support.play': string;
	'support.no': string;
	'support.screenlock': string;
	'game.load': string;
	'game.loadError': string;
	'game.start': string;
	'song.title': string;
	'reset.headline': string;
	'reset.body': string;
	'reset.yes': string;
	'reset.no': string;
	'narrator.selected': string;
	'narrator.next': string;
	'narrator.prev': string;
	'narrator.close': string;
	'narrator.music.button': string;
	'narrator.headline.day': string;
	'narrator.headline.night': string;
	'narrator.headline.plural': string;
	'narrator.headline.singular.masculinum': string;
	'narrator.headline.singular.feminimum': string;
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
	'narrator.thief.description': string;
	'narrator.thief.name': string;
	'narrator.thief.name.plural': string;
};

export const t = derived(
	localeStore,
	(locale) =>
		(key: keyof Translations, vars: Record<string, string> = {}) => {
			const translations = locale === 'en' ? EN : DE;

			// Grab the translation from the translations object.
			let text = translations[key];

			if (!text || (typeof window !== 'undefined' && window.location.search.includes('debug'))) {
				return key;
			}

			// Replace any passed in variables in the translation string.
			Object.entries(vars).map(([key, value]) => {
				const regex = new RegExp(`{{${key}}}`, 'g');

				text = text?.replace(regex, value);
			});

			return text;
		}
);
