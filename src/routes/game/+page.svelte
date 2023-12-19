<script lang="ts">
	import { goto } from '$app/navigation';

	import { gameStore } from '$lib/stores/game';
	import { startNextGamePhase } from '$lib/game';
	import { getUtilityRole, showRole } from '$lib/roles';

	import Controls from '../../components/game/controls.svelte';
	import Counter from '../../components/game/counter.svelte';
	import SunAndMoon from '../../components/game/sunAndMoon.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($gameStore.state !== 'running') {
			goto('/');
		}
	});

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
