<script lang="ts">
	import { onMount } from 'svelte';

	import { gameStore } from '$lib/stores/game';
	import { t } from '$lib/stores/i18n';

	import SunAndMoon from './sunAndMoon.svelte';
	import { playerStore } from '$lib/stores/player';
	import { startFirstNightPhase, startNextGamePhase } from '$lib/game';
	import { showCurrentSongToast } from '$lib/stores/toast';

	$: handleBtnClick = $gameStore.gamestate === 'day' ? startNight : startDay;

	onMount(async () => {
		if ($gameStore.nightCount > 0) {
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

	$: isDisabled = $playerStore.fading || !$playerStore.nextSong;
</script>

<div class="container">
	<div
		class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content w-fit justify-self-center"
	>
		<span class="countdown font-mono text-5xl">
			<span style={`--value:${$gameStore.nightCount};`} />
		</span>
		{$t('counter')}
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
