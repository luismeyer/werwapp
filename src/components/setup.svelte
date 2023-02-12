<script lang="ts">
	import { onMount } from 'svelte';

	import { loadNextRandomSongForPhase } from '$lib/song';
	import { playerStore } from '$lib/stores/player';
	import { gameStore } from '$lib/stores/game';

	import Game from './game.svelte';
	import RolesSetup from './roles-setup.svelte';

	$: ({ nextPhaseSong } = $playerStore);

	onMount(async () => {
		if ($gameStore.state == 'running') {
			return;
		}

		await loadNextRandomSongForPhase('night');

		playerStore.update({ currentPhaseSong: nextPhaseSong, nextPhaseSong: undefined });
	});
</script>

<!-- This is needed because daisy ui requires the tabindex -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

{#if $gameStore.state !== 'running'}
	<RolesSetup />
{:else}
	<Game />
{/if}
