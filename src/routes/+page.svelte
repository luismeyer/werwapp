<script lang="ts">
	import { onMount } from 'svelte';
	import { start } from 'tone';

	import { loadNextRandomSong } from '$lib/song';
	import { songData } from '$lib/songdata';
	import { playerStore } from '$lib/stores/player';

	import { t } from '$lib/translation/i18n';

	import Forest from '../components/forest.svelte';
	import Game from '../components/game.svelte';
	import Settings from '../components/settings.svelte';

	import '../app.css';

	type Tab = 'game' | 'settings';

	let tabs: Tab[] = ['game', 'settings'];
	let activeTab = 0;

	let gameStarted = false;

	$: ({ nextSong, currentSong } = $playerStore);

	onMount(async () => {
		await loadNextRandomSong(songData.nightSongs, 'night');

		playerStore.update({ currentSong: nextSong, nextSong: undefined });
	});

	const startGame = async () => {
		await start();

		gameStarted = true;
	};

	$: buttonLabel = currentSong ? $t('game.start') : $t('game.load');
</script>

<div class="content">
	<header>
		<div class="flex justify-around py-5">
			<h1 class="text-5xl font-bold">{$t('game.name')}</h1>
		</div>
	</header>

	<main class="px-8 relative overflow-hidden">
		{#if activeTab === 0}
			{#if !gameStarted}
				<div class="h-full flex justify-center items-center">
					<button disabled={!$playerStore.currentSong} on:click={startGame} class="btn btn-primary">
						{buttonLabel}
					</button>
				</div>
			{:else}
				<Game />
			{/if}
		{:else if activeTab === 1}
			<Settings />
		{/if}
	</main>

	<Forest />
</div>

<div class="btm-nav navigation theme">
	{#each tabs as tab, index}
		<button class="theme" on:click={() => (activeTab = index)} class:active={index === activeTab}>
			{$t(tab)}
		</button>
	{/each}
</div>

<style>
	.content {
		display: grid;
		width: 100vw;
		/* Substract height of bottom nav */
		min-height: calc(100dvh - 5rem);
		grid-template-rows: auto 1fr;
		position: relative;
	}

	.navigation {
		margin: auto;
		/* Safe space for mobile devices with home bar */
		bottom: 1rem;
	}
</style>
