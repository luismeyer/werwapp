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

	let toastVisible = false;

	$: handleBtnClick = $gameStore.gamestate === 'day' ? startNight : startDay;

	onMount(async () => {
		if ($gameStore.nightCount > 0) {
			return;
		}

		showToast();

		// start the music
		nightPlayer.start();

		gameStore.setNight();

		// load next day song
		const nextSong = await loadRandomSong(songData.daySongs, dayPlayer);

		gameStore.updateGame({ nextSong });
	});

	const startNextPhase = async (nextPhase: 'night' | 'day') => {
		const currentPlayer = nextPhase === 'day' ? nightPlayer : dayPlayer;
		const nextPlayer = nextPhase === 'day' ? dayPlayer : nightPlayer;

		gameStore.updateGame({ fading: true, currentSong: $gameStore.nextSong, nextSong: undefined });

		showToast();

		nextPlayer.start();

		await fadeSongs(nextPhase, crossFade);

		currentPlayer.stop();

		gameStore.updateGame({ fading: false });
	};

	const startNight = async () => {
		gameStore.setNight();

		await startNextPhase('night');

		const nextSong = await loadRandomSong(songData.daySongs, dayPlayer);
		gameStore.updateGame({ nextSong });
	};

	const startDay = async () => {
		gameStore.setDay();

		await startNextPhase('day');

		const nextSong = await loadRandomSong(songData.nightSongs, nightPlayer);
		gameStore.updateGame({ nextSong });
	};

	const showToast = () => {
		toastVisible = true;

		setTimeout(() => (toastVisible = false), 2000);
	};

	$: isDisabled = $gameStore.fading || !$gameStore.nextSong;
</script>

<div class="container">
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

	<SunAndMoon disabled={isDisabled} handleStateChange={handleBtnClick} />

	<a
		class="toast toast-top toast-center w-9/12"
		class:hidden={!toastVisible}
		target="_blank"
		rel="noreferrer"
		href={$gameStore.currentSong?.songPage}
	>
		<div class="alert">
			<div>
				<span>{$gameStore.currentSong?.title} von {$gameStore.currentSong?.artist}</span>
			</div>
		</div>
	</a>
</div>

<style>
	.container {
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100%;
		width: 100%;
		margin: auto;
	}
</style>
