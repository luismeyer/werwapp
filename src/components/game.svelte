<script lang="ts">
	import { onMount } from 'svelte';

	import { gameStore } from '$lib/stores/game';
	import { t } from '$lib/stores/i18n';

	import SunAndMoon from './sunAndMoon.svelte';
	import { playerStore } from '$lib/stores/player';
	import { startFirstNightPhase, startNextGamePhase } from '$lib/game';

	let toastVisible = false;

	$: handleBtnClick = $gameStore.gamestate === 'day' ? startNight : startDay;

	$: ({ currentSong } = $playerStore);

	onMount(async () => {
		if ($gameStore.nightCount > 0) {
			return;
		}

		showToast();

		startFirstNightPhase();
	});

	const startNight = async () => {
		await startNextGamePhase('night');

		showToast();
	};

	const startDay = async () => {
		await startNextGamePhase('day');

		showToast();
	};

	const showToast = () => {
		toastVisible = true;

		setTimeout(() => (toastVisible = false), 2000);
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
