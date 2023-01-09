<script lang="ts">
	import { onMount } from 'svelte';
	import type { CrossFade, Player } from 'tone';

	import { fadeSongs, loadRandomSong, type Song } from '$lib/songs/song';
	import { songData } from '$lib/songs/songdata';
	import { gameStore } from '$lib/stores/gamestore';
	import { t } from '$lib/translation/i18n';
	import SunAndMoon from './sunAndMoon.svelte';

	export let crossFade: CrossFade;
	export let dayPlayer: Player;
	export let nightPlayer: Player;

	export let firstSong: Song;

	let isSongFading = true;

	let toastVisible = false;

	let currentSong: Song | undefined;
	let nextSong: Song | undefined;

	$: handleBtnClick = $gameStore.gamestate === 'day' ? startNight : startDay;

	onMount(async () => {
		if ($gameStore.nightCount > 0) {
			isSongFading = false;
			return;
		}

		currentSong = firstSong;
		showToast();

		// start the music
		nightPlayer.start();

		gameStore.setNight();

		isSongFading = false;

		// load next day song
		nextSong = await loadRandomSong(songData.daySongs, dayPlayer);
	});

	const startNextPhase = async (nextPhase: 'night' | 'day') => {
		const currentPlayer = nextPhase === 'day' ? nightPlayer : dayPlayer;
		const nextPlayer = nextPhase === 'day' ? dayPlayer : nightPlayer;

		isSongFading = true;

		currentSong = nextSong;
		nextSong = undefined;
		showToast();

		nextPlayer.start();

		await fadeSongs(nextPhase, crossFade);

		currentPlayer.stop();

		isSongFading = false;
	};

	const startNight = async () => {
		await startNextPhase('night');

		gameStore.setNight();
		nextSong = await loadRandomSong(songData.daySongs, dayPlayer);
	};

	const startDay = async () => {
		await startNextPhase('day');

		gameStore.setDay();
		nextSong = await loadRandomSong(songData.nightSongs, nightPlayer);
	};

	const showToast = () => {
		toastVisible = true;

		setTimeout(() => (toastVisible = false), 2000);
	};

	$: isDisabled = isSongFading || !nextSong;
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
	<SunAndMoon disabled={isDisabled} handleStateChange={handleBtnClick} />
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
