<script lang="ts">
	import { onMount } from 'svelte';
	import * as Tone from 'tone';

	import { loadNextRandomSongForPhase } from '$lib/song';
	import { t } from '$lib/stores/i18n';
	import { playerStore } from '$lib/stores/player';
	import { gameStore } from '$lib/stores/game';

	import Game from '../components/game.svelte';
	import { showCurrentSongToast } from '$lib/stores/toast';
	import { startFirstNightPhase } from '$lib/game';

	$: ({ nextPhaseSong, currentPhaseSong } = $playerStore);

	onMount(async () => {
		if ($gameStore.state == 'running') {
			return;
		}
		await loadNextRandomSongForPhase('night');

		playerStore.update({ currentPhaseSong: nextPhaseSong, nextPhaseSong: undefined });
	});

	const startGame = async () => {
		await Tone.start();

		gameStore.start();

		showCurrentSongToast();

		startFirstNightPhase();
	};

	$: buttonLabel = currentPhaseSong ? $t('game.start') : $t('game.load');
</script>

{#if $gameStore.state !== 'running'}
	<div class="h-full flex justify-center items-center">
		<button disabled={!$playerStore.currentPhaseSong} on:click={startGame} class="btn btn-primary">
			{buttonLabel}
		</button>
	</div>
{:else}
	<Game />
{/if}
