<script lang="ts">
	import { startNextGamePhase } from '$lib/game';
	import { gameStore } from '$lib/stores/game';
	import { getUtilityRole, showRole } from '$lib/roles';

	import SunAndMoon from './sunAndMoon.svelte';
	import Counter from './counter.svelte';
	import Controls from './controls.svelte';

	$: handleBtnClick = $gameStore.gamestate === 'day' ? startNight : startDay;

	const startNight = async () => {
		showRole(getUtilityRole('night'));
		await startNextGamePhase();
	};

	const startDay = async () => {
		showRole(getUtilityRole('day'));
		await startNextGamePhase();
	};
</script>

<div class="game">
	<div class="flex items-center justify-around">
		<Counter />

		<Controls />
	</div>

	<SunAndMoon on:click={handleBtnClick} />
</div>

<style>
	.game {
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100%;
		width: 100%;
		margin: auto;
		overflow: hidden;
	}
</style>
