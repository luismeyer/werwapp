import type { Translations } from '$lib/stores/translations.svelte';

export const DE: Translations = {
	'about.title': 'Über Werwapp',
	'about.github': 'Hier findest du uns bei Github!',
	'narrator.thief.name.plural': 'Diebe',
	'about.licenses.loading': 'Lade Lizenzen',
	'about.licenses.description': 'Von {{author}} mit einer {{licenseType}} Lizenz',
	'about.licenses.project': 'Projekt',
	'about.licenses.title':
		'Das sind die Lizenses der Bibliotheken, die wir zum Erstellen von Werwapp verwendet haben:',
	night: 'Nacht',
	day: 'Tag',
	game: 'Spiel',
	rules: 'Regeln',
	settings: 'Einstellungen',
	'settings.discribtion': 'Hier kannst du deine Spieleinstellungen bearbeiten.',
	'settings.theme.toggle': 'Dynamischer Farbschemawechsel',
	'settings.daytheme': 'Tag-Theme',
	'settings.nighttheme': 'Nacht-Theme',
	'settings.theme': 'Theme',
	'settings.qa': 'Hast du Fragen?',
	'settings.support': 'Hilfe bitte!',
	'settings.about.label': 'Du willst mehr wissen?',
	'settings.about.button': 'Über Werwapp',
	'settings.reset': 'Spiel zurücksetzten',
	'settings.wakelock': 'Deaktiviere die automatische Bildschirmsperre',
	en: 'Englisch',
	de: 'Deutsch',
	'game.name': 'Werwapp',
	state: 'Status',
	'support.headline': 'Willkommen im Support-Chat',
	'support.welcome': '👋 hey. Frag mich egal was',
	'support.sound':
		'Wenn du ein Iphone hast, musst du den Stummmodus deaktivieren. Ansonsten: hast du versucht, dein Gerät neu zu start?',
	'support.play':
		'Um zu spielen musst du nur entweder auf den Mond oder die Sonne klicken, um die aktuelle Phase zu ändern. Dann wechselt die Musik automatisch',
	'support.no': 'Darauf habe ich keine Antwort',
	'support.screenlock':
		'Du kannst die automatische Bildschirmsperre in den Einstellungen deaktivieren. Wenn die Option deaktiviert ist, dann unterstützt dein Browser diese Funktion leider nicht.',
	'game.load': 'Der erste Song wird geladen...',
	'game.loadError': 'Song konnte nicht geladen werden. Bitte versuche es später erneut',
	'game.start': 'Starte das Spiel',
	'song.title': '{{song}} von {{artist}}',
	'reset.headline': 'Bist du dir sicher?',
	'reset.body':
		'Wenn du das Spiel zurücksetzt, dann geht der aktuelle Spielstand verloren. Du musst wieder in der ersten Nacht anfangen.',
	'reset.yes': 'Trotzdem',
	'reset.no': 'Lieber nicht',
	'narrator.selected': 'Ausgewählt Rollen',
	'narrator.next': 'weiter',
	'narrator.prev': 'zurück',
	'narrator.close': 'schließen',
	'narrator.music.button': 'Musik ändern',
	'narrator.headline.day': 'Das Dorf erwacht!',
	'narrator.headline.night': 'Das Dorf schläft ein!',
	'narrator.headline.plural': 'Die {{role}} erwachen!',
	'narrator.headline.singular.feminimum': 'Die {{role}} erwacht!',
	'narrator.headline.singular.masculinum': 'Der {{role}} erwacht!',
	'narrator.headline.singular.neutrum': 'Das {{role}} erwacht!',
	'narrator.amor.name': 'Amor',
	'narrator.amor.description':
		'Amor schießt zwei Liebes-Pfeile ab und verliebt die beiden Ziele. Die beiden Verliebten erwachen und schauen sich tief in die Augen. Das neue Ziel des Paares ist es, bis zum Ende zu überleben.',
	'narrator.hunter.name': 'Jäger',
	'narrator.hunter.name.plural': 'Jäger',
	'narrator.hunter.description':
		'Wenn der Jäger während der letzten Nacht getötet wurde, kann er sich nun rächen. Dafür wählt er eine*n weitere*n Spieler*in und reißt diese*n mit in den Tod.',
	'narrator.villager.name': 'Dorfbewohner*in',
	'narrator.villager.name.plural': 'Dorfbewohner*innen',
	'narrator.villager.description':
		'Das ganze Dorf muss sich nun für einen Sündenbock entscheiden, der an diesem Tag gehängt wird.',
	'narrator.seer.name': 'Seherin',
	'narrator.seer.name.plural': 'Seherinnen',
	'narrator.seer.description':
		'Die Seherin kann jede Nacht die Identität eines/einer anderen Mitspielers/Mitspielerin herausfinden. Dafür zeigt sie auf die Person und der/die Erzähler*in zeigt die Karte des Spielenden.',
	'narrator.werewolf.name': 'Werwolf',
	'narrator.werewolf.name.plural': 'Werwölfe',
	'narrator.werewolf.description':
		'Das Werwolfrudel sucht sich jede Nacht ein Opfer aus. Dafür müssen alle Wölfe gemeinsam abstimmen.',
	'narrator.witch.name': 'Hexe',
	'narrator.witch.name.plural': 'Hexe',
	'narrator.witch.description':
		'Die Hexe hat einen Heiltrank und einen Todestrank. Sie kann jeden Trank nur einmal im Spiel benutzen. Bevor sie die Tränke einsatzt erfährt sie wer das Opfer der Werwölfe diese Nacht ist.',
	'narrator.girl.name': 'Blinzelmädchen',
	'narrator.girl.name.plural': 'Blinzelmädchen',
	'narrator.girl.description':
		'Das Blinzelmädchen wacht zusammen mit den Werwölfen auf. Dabei versucht sie unbemerkt die Augen zu öffnen und die Wölfe auszuspionieren.',
	'narrator.thief.description':
		'Der Dieb erwacht und darf die eigene Identität mit einer andere Person tauschen. Nach dem tausch erwacht das Dorf erneut und überprüft erneut die Rollen. Nach der ersten Nacht ist die Rolle der Diebes die eines normalen Dorfbewohners.',
	'narrator.thief.name': 'Dieb',
	'narrator.amor.name.plural': 'Amore',
	'narrator.bitch.name': 'Dorfmatratze',
	'narrator.bitch.name.plural': 'Dorfmatratzen',
	'narrator.bitch.description':
		'Die Dorfmatratze kann sich in jeder Nacht entscheiden, mit welchem anderen Spieler sie die Nacht verbringt. Versuchen die Werwölfe sie zu töten stirbt sie nicht, denn sie ist ja nicht zuhause. Töten die Werwölfe den Spieler bei dem sie übernachtet, stirbt die Prostituierte zusammen mit dem Spieler.'
};
