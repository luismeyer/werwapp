import type { Locale, Translations } from './translation/translations';
import { findBestMatch } from 'string-similarity';

type Question = {
	[Property in Locale]: Array<string>;
};

type QA = Array<{
	answer: keyof Translations;
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
	}
];

export const findAnswer = (input: string, language: Locale): keyof Translations => {
	const targetStrings = QA.reduce<string[]>(
		(acc, curr) => [...acc, ...curr.question[language]],
		[]
	);

	const { bestMatch } = findBestMatch(input.toLowerCase(), targetStrings);

	console.log({ bestMatch });

	const match = bestMatch.rating > 0.2 ? bestMatch.target : 'undefined';

	const qa = QA.find(({ question }) => question[language].includes(match));

	if (!qa) {
		return 'support.no';
	}

	return qa.answer;
};
