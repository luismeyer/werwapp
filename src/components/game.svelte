<script lang="ts">
	import { gameStore } from '$lib/stores/gamestore';
	import type { Player, CrossFade } from 'tone';
	import { songData } from '$lib/songs/songdata';
	import type { Song } from '$lib/songs/song';
	import { t } from '$lib/translation/i18n';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	export let crossFade: CrossFade;
	export let dayTone: Player;
	export let nightTone: Player;

	let isDisabled = true;

	let toastVisible = false;
	let currentSong: Song;

	$: handleBtnClick = $gameStore.gamestate === 'day' ? startNight : startDay;

	const fadeSongs = (target: 'day' | 'night') => {
		const internal = target === 'night' ? 1 : 0;

		return new Promise((res) => {
			const interval = setInterval(() => {
				const modifier = internal === 1 ? 0.01 : -0.01;

				crossFade.fade.value = parseFloat((crossFade.fade.value + modifier).toFixed(2));

				if (crossFade.fade.value === internal) {
					clearInterval(interval);
					res(true);
				}
			}, 50);
		});
	};

	onMount(async () => {
		if ($gameStore.nightCount > 0) {
			isDisabled = false;
			return;
		}

		console.log('TURN UP THE MUSIC');

		const nightSong = getRandomSong(songData.nightSongs);
		await nightTone.load('api/songs?url=' + nightSong.internalUrl);

		showToast(nightSong);

		nightTone.start();

		gameStore.setNight();

		isDisabled = false;
	});

	const startNight = async () => {
		isDisabled = true;

		const newSong = getRandomSong(songData.nightSongs);
		await nightTone.load('api/songs?url=' + newSong.internalUrl);

		gameStore.setNight();

		nightTone.start();

		await fadeSongs('night');
		showToast(newSong);

		dayTone.stop();

		isDisabled = false;
	};

	const startDay = async () => {
		isDisabled = true;

		const newSong = getRandomSong(songData.daySongs);
		await dayTone.load('api/songs?url=' + newSong.internalUrl);

		gameStore.setDay();

		dayTone.start();

		await fadeSongs('day');

		showToast(newSong);

		nightTone.stop();

		isDisabled = false;
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

<div class="flex justify-around py-10">
	<div class="stats bg-base-300 border-base-300 border md:w-1/2">
		<div class="stat">
			<div class="stat-title">{$t('counter')}</div>
			<div class="stat-value">{$gameStore.nightCount}</div>
		</div>
	</div>

	<div class="stats bg-base-300 border-base-300 border md:w-1/2">
		<div class="stat">
			<div class="stat-title">{$t('state')}</div>
			<div class="stat-value">{$t($gameStore.gamestate)}</div>
		</div>
	</div>
</div>

<div class="flex justify-center">
	<button
		data-set-theme={$gameStore.gamestate === 'day' ? $themeStore.darkTheme : $themeStore.lightTheme}
		on:click={handleBtnClick}
		disabled={isDisabled}
		class="btn btn-primary"
	>
		{$gameStore.gamestate === 'day' ? 'Beginne die Nacht' : 'Beginne den Tag'}
	</button>
</div>

<a
	class="toast toast-top toast-center w-9/12"
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
