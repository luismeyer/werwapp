import { findBestMatch } from 'string-similarity';
import type { Locale } from './stores/i18n';

type Question = {
	[Property in Locale]: Array<string>;
};

type QA = Array<{
	answer: string;
	question: Question;
}>;

const QA: QA = [
	{
		answer: 'support.sound',
		question: {
			de: [
				'wieso geht der Ton nicht',
				'wieso startet die Musik nicht',
				'audio funktiert nicht',
				'sound geht nicht',
				'es werden keine geräusch ausgegeben',
				'ich höre kein lied',
				'der song kommt nicht'
			],
			en: [
				'why is the sound not working',
				'music not working',
				'audio not hearable',
				'song not starting'
			]
		}
	},
	{
		answer: 'support.play',
		question: {
			de: [
				'wie aktiviere ich den tag',
				'wie mache ich nacht',
				'zyklus wechseln',
				'wie starte ich das spiel',
				'wie wechsle ich die phase'
			],
			en: [
				'how do i start the game',
				'how do i make night',
				'change the phase',
				'start the day',
				'how do i change to day'
			]
		}
	},
	{
		answer: 'support.screenlock',
		question: {
			de: [
				'warum kann ich die automatische bildschirm sperre nicht deaktivieren',
				'wieso geht die bildschirmsperre nicht',
				'ich kann den screenlock nicht ausschalten',
				'wieso sperrt sich während dem spiel mein handy'
			],
			en: [
				'how can i disable automatic screenlock',
				'i can not disable automatic screenlock',
				'deactivate screenlock'
			]
		}
	}
];

export const findAnswer = (input: string, language: Locale): string => {
	const targetStrings = QA.reduce<string[]>(
		(acc, curr) => [...acc, ...curr.question[language]],
		[]
	);

	const { bestMatch } = findBestMatch(input.toLowerCase(), targetStrings);

	const match = bestMatch.rating > 0.2 ? bestMatch.target : 'undefined';

	const qa = QA.find(({ question }) => question[language].includes(match));

	if (!qa) {
		return 'support.no';
	}

	return qa.answer;
};
