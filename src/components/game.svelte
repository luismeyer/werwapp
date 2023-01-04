<script lang="ts">
	import { gameStore } from '../lib/stores/gamestore';
	import { Player, CrossFade } from 'tone';
	import { songData } from '$lib/songs/songdata';
	import type { Song } from '$lib/songs/song';

	let crossFade: CrossFade;
	let dayTone: Player;
	let nightTone: Player;

	let isFading = false;

	let toastVisible = false;
	let currentSong: Song;

	$: handleBtnClick =
		$gameStore.nightCount === 0
			? startFirstNight
			: $gameStore.gamestate === 'day'
			? startNight
			: startDay;

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

		nightTone = new Player();
		const nightSong = getRandomSong(songData.nightSongs);
		await nightTone.load('api/songs?url=' + nightSong.internalUrl);
		showToast(nightSong);
		nightTone.loop = true;

		// bind day to 0
		dayTone.connect(crossFade.a);

		// bind night to 1
		nightTone.connect(crossFade.b);

		crossFade.fade.value = 1;

		nightTone.start();
		gameStore.setNight();
	};

	const startNight = async () => {
		const newSong = getRandomSong(songData.nightSongs);
		await nightTone.load('api/songs?url=' + newSong.internalUrl);

		gameStore.setNight();

		nightTone.start();

		await fadeSongs('night');
		showToast(newSong);

		dayTone.stop();
	};

	const startDay = async () => {
		const newSong = getRandomSong(songData.daySongs);
		await dayTone.load('api/songs?url=' + newSong.internalUrl);

		gameStore.setDay();

		dayTone.start();

		await fadeSongs('day');

		showToast(newSong);

		nightTone.stop();
	};

	const getRandomSong = (songs: Song[]): Song => {
		const song = songs[Math.round(Math.random() * (songs.length - 1))];
		return song;
	};

	const showToast = (song: Song) => {
		currentSong = song;
		toastVisible = true;

		setTimeout(() => (toastVisible = false), 5000);
	};
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

<a
	class="toast toast-top toast-center"
	class:hidden={!toastVisible}
	target="_blank"
	rel="noreferrer"
	href={currentSong?.songPage}
>
	<div class="alert">
		<div>
			<span>{currentSong?.title} von {currentSong?.artist}</span>
		</div>
	</div>
</a>
