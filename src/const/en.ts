import type { Translations } from '$lib/stores/translations.svelte';

export const EN: Translations = {
	'about.title': 'About Werwapp',
	'about.github': 'Find us on Github!',
	'about.licenses.title': 'These are the Licenses of the libaries that we used to create Werwapp:',
	'about.licenses.loading': 'Loading licenses',
	'about.licenses.description': 'From {{author}} with a {{licenseType}} Lizenz',
	'about.licenses.project': 'Project',
	night: 'Night',
	day: 'Day',
	game: 'Game',
	settings: 'Settings',
	rules: 'Rules',
	en: 'English',
	de: 'German',
	'game.name': 'Werwapp',
	'settings.discribtion': 'Here you can edit your game settings.',
	'settings.theme.toggle': 'Automatic color scheme',
	'settings.daytheme': 'Day Theme',
	'settings.nighttheme': 'Night Theme',
	'settings.theme': 'Theme',
	'settings.qa': 'Any Questions?',
	'settings.support': 'Support pls!',
	'settings.about.label': 'Wanna know more?',
	'settings.about.button': 'About Werwapp',
	'settings.reset': 'Reset Game',
	'settings.wakelock': 'Disable automatic screenlock',
	state: 'state',
	'support.headline': 'Welcome to the Support-Chat',
	'support.welcome': '👋 hey. You can ask me anything',
	'support.sound':
		'If you are on an Iphone you have to deactivate the silent mode. Otherwise have you tried turning it off and on again?',
	'support.play':
		'To use this App you just have to click on either the moon or sun to change the current Phase. The music will change automatically',
	'support.no': 'I have no answer to this',
	'support.screenlock':
		"You can deactivate the automatic screenlock inside the settings. If the option is disabled your Browser currently doesn't support this feature.",
	'game.load': 'The first song is loading...',
	'game.loadError': 'Song could not be loaded. Please try again later',
	'game.start': 'Start the game',
	'song.title': '{{song}} by {{artist}}',
	'reset.headline': 'Are you sure?',
	'reset.body':
		'When you reset the Game the current state will be lost and you have to start the game with the first night again.',
	'reset.yes': 'Yes go ahead!',
	'reset.no': 'NoNoNoNo',
	'narrator.selected': 'Selected Roles',
	'narrator.next': 'next',
	'narrator.prev': 'back',
	'narrator.close': 'close',
	'narrator.music.button': 'switch music',
	'narrator.headline.day': 'The Village awakens!',
	'narrator.headline.night': 'The Village goes to sleep!',
	'narrator.headline.plural': 'The {{role}} awaken!',
	'narrator.headline.singular.masculinum': 'The {{role}} awakens!',
	'narrator.headline.singular.feminimum': 'The {{role}} awakens!',
	'narrator.headline.singular.neutrum': 'The {{role}} awakens!',
	'narrator.amor.name': 'Amor',
	'narrator.amor.name.plural': 'Amors',
	'narrator.amor.description':
		'The amor shoots arrows of love at two people. They open their eyes and fall in love. The new goal if this couple is to be the last two alive.',
	'narrator.hunter.name': 'Hunter',
	'narrator.hunter.name.plural': 'Hunters',
	'narrator.hunter.description':
		'If the hunter died last night he will now revenge himself by killing one other player!',
	'narrator.villager.name': 'Villager',
	'narrator.villager.name.plural': 'Villagers',
	'narrator.villager.description':
		'The whole village decides now who will be killed and made responsible for the crimes that happened.',
	'narrator.seer.name': 'Seer',
	'narrator.seer.name.plural': 'Seers',
	'narrator.seer.description':
		'The Seer can use her magic spells to see the role of one other player. She can use these spells once per night.',
	'narrator.werewolf.name': 'Werwolf',
	'narrator.werewolf.name.plural': 'Werwolfs',
	'narrator.werewolf.description':
		'The Werwolf pack kills one other player per night. The have to vote without making any sounds and by pointing their fingers at the target.',
	'narrator.witch.name': 'Witch',
	'narrator.witch.name.plural': 'Witches',
	'narrator.witch.description':
		'The Witch owns two potions. One to heal and one to kill another person or herself. She can use each potion only once by eather showing a thumbs up or down. Before she makes her choice the narrator reveals the person that will be killed by the werewolfs',
	'narrator.girl.name': 'Girl',
	'narrator.girl.name.plural': 'Girls',
	'narrator.girl.description':
		'The Girl can open her eyes secretly while the werewolfs choose a target and therefor spy on them.',
	'narrator.thief.description':
		'The thief can change their own identity with somebody else. Afterwards everybody awakens and checks for the new roles. After the first night the thief will act as a normal villager.',
	'narrator.thief.name': 'Thief',
	'narrator.thief.name.plural': 'Thiefs'
};
