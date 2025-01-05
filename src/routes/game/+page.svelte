<script lang="ts">
	import { goto } from '$app/navigation';

	import { gameState } from '$lib/stores/game.svelte';
	import { startNextGamePhase } from '$lib/game';
	import { getUtilityRole, showRole } from '$lib/roles.svelte';

	import Controls from '../../components/game/controls.svelte';
	import Counter from '../../components/game/counter.svelte';
	import SunAndMoon from '../../components/game/sunAndMoon.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		if (gameState.state !== 'running') {
			goto('/');
		}
	});

	const startNight = async () => {
		showRole(getUtilityRole('night'));
		await startNextGamePhase();
	};

	const startDay = async () => {
		showRole(getUtilityRole('day'));
		await startNextGamePhase();
	};

	const handleBtnClick = $derived(gameState.phase === 'day' ? startNight : startDay);
</script>

<div class="game">
	<div class="flex items-center justify-around">
		<Counter />

		<Controls />
	</div>

	<SunAndMoon onclick={handleBtnClick} />
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
