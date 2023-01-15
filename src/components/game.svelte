<script lang="ts">
	import { onMount } from 'svelte';

	import { startFirstNightPhase, startNextGamePhase } from '$lib/game';
	import { gameStore } from '$lib/stores/game';
	import { playerStore } from '$lib/stores/player';
	import { showCurrentSongToast } from '$lib/stores/toast';

	import SunAndMoon from './sunAndMoon.svelte';
	import Counter from './counter.svelte';
	import Controls from './controls.svelte';

	$: handleBtnClick = $gameStore.gamestate === 'day' ? startNight : startDay;

	onMount(async () => {
		if ($gameStore.nightCount > 1) {
			return;
		}

		showCurrentSongToast();

		startFirstNightPhase();
	});

	const startNight = async () => {
		await startNextGamePhase('night');

		showCurrentSongToast();
	};

	const startDay = async () => {
		await startNextGamePhase('day');

		showCurrentSongToast();
	};

	$: isDisabled = $playerStore.fading || !$playerStore.nextPhaseSong;
</script>

<div class="container">
	<div class="flex items-center justify-around">
		<Counter />

		<Controls />
	</div>

	<SunAndMoon disabled={isDisabled} handleStateChange={handleBtnClick} />
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
