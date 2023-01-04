<script lang="ts">
	import { gameStore } from '../lib/stores/gamestore';
	import { Player, CrossFade } from 'tone';
	import { songData } from '$lib/songs/songdata';
	import type { Song } from '$lib/songs/song';

	let crossFade: CrossFade;
	let dayTone: Player;
	let nightTone: Player;

	let fadeValue = 1;

	let isFading = false;

	const fadeSongs = (target: 'day' | 'night') => {
		isFading = true;
		const internal = target === 'night' ? 1 : 0;

		return new Promise((res) => {
			const interval = setInterval(() => {
				const modifier = internal === 1 ? 0.01 : -0.01;

				crossFade.fade.value = parseFloat((crossFade.fade.value + modifier).toFixed(2));

				if (crossFade.fade.value === internal) {
					clearInterval(interval);
					isFading = false;
					res(true);
				}
			}, 50);
		});
	};

	const startFirstNight = async () => {
		console.log('TURN UP THE MUSIC');
		crossFade = new CrossFade().toDestination();

		dayTone = new Player();
		await dayTone.load('api/songs?url=' + getRandomSong(songData.daySongs));
		dayTone.loop = true;

		nightTone = new Player();
		await nightTone.load('api/songs?url=' + getRandomSong(songData.nightSongs));
		nightTone.loop = true;

		// bind day to 0
		dayTone.connect(crossFade.a);

		// bind night to 1
		nightTone.connect(crossFade.b);

		crossFade.fade.value = fadeValue;

		nightTone.start();
		gameStore.setNight();
	};

	const startNight = async () => {
		gameStore.setNight();

		nightTone.start();

		await fadeSongs('night');

		dayTone.stop();
	};

	const startDay = async () => {
		gameStore.setDay();

		dayTone.start();

		await fadeSongs('day');

		nightTone.stop();
	};

	const getRandomSong = (songs: Song[]): string => {
		const song = songs[Math.ceil(Math.random() * (songs.length - 1))];
		console.log(song);
		return song.internalUrl;
	};

	$: handleBtnClick =
		$gameStore.nightCount === 0
			? startFirstNight
			: $gameStore.gamestate === 'day'
			? startNight
			: startDay;

	console.log($gameStore.gamestate);
</script>

<p>{$gameStore.gamestate}</p>
<p>{$gameStore.nightCount}</p>

<button disabled={isFading} on:click={handleBtnClick} class="btn btn-primary"
	>{$gameStore.nightCount === 0
		? 'Beginne die erste Nacht'
		: $gameStore.gamestate === 'day'
		? 'Beginne die Nacht'
		: 'Beginne den Tag'}</button
>
