<script lang="ts">
	import { onMount } from 'svelte';
	import { CrossFade, Player, start } from 'tone';

	import { loadRandomSong } from '$lib/songs/song';
	import { songData } from '$lib/songs/songdata';
	import { gameStore } from '$lib/stores/gamestore';
	import { themeStore } from '$lib/stores/theme';
	import { t } from '$lib/translation/i18n';

	import Game from '../components/game.svelte';
	import Settings from '../components/settings.svelte';
	import Forest from '../components/forest.svelte';

	import '../app.css';

	type Tab = 'game' | 'settings';

	let tabs: Tab[] = ['game', 'settings'];
	let activeTab = 0;

	let crossFade: CrossFade;
	let dayPlayer: Player;
	let nightPlayer: Player;

	let gameStarted = false;

	onMount(async () => {
		crossFade = new CrossFade({ fade: 1 }).toDestination();

		dayPlayer = new Player({ loop: true });

		// bind day to 0
		dayPlayer.connect(crossFade.a);

		nightPlayer = new Player({ loop: true });

		// bind night to 1
		nightPlayer.connect(crossFade.b);

		const firstSong = await loadRandomSong(songData.nightSongs, nightPlayer);

		gameStore.updateGame({ currentSong: firstSong });
	});

	const startGame = async () => {
		await start();

		gameStarted = true;
	};

	$: buttonLabel = $gameStore.currentSong ? 'Start das Spiel' : 'erster Song wird geladen...';

	$: currentTheme =
		$themeStore.autoSwitching && $gameStore.gamestate === 'day'
			? $themeStore.lightTheme
			: $themeStore.darkTheme;
</script>

<div class="content theme" data-theme={currentTheme}>
	<header>
		<div class="flex justify-around py-5">
			<h1 class="text-5xl font-bold">{$t('game.name')}</h1>
		</div>
	</header>

	<main class="px-8 relative overflow-hidden">
		{#if activeTab === 0}
			{#if !gameStarted}
				<div class="h-full flex justify-center items-center">
					<button disabled={!$gameStore.currentSong} on:click={startGame} class="btn btn-primary">
						{buttonLabel}
					</button>
				</div>
			{:else}
				<Game {crossFade} {dayPlayer} {nightPlayer} />
			{/if}
		{:else if activeTab === 1}
			<Settings />
		{/if}
	</main>

	<Forest />
</div>

<div class="btm-nav navigation">
	{#each tabs as tab, index}
		<button on:click={() => (activeTab = index)} class:active={index === activeTab}>
			{$t(tab)}
		</button>
	{/each}
</div>

<div class="safe-area" />

<style>
	.content {
		display: grid;
		width: 100vw;
		/* Substract height of bottom nav */
		min-height: calc(100dvh - 5rem);
		grid-template-rows: auto 1fr;
	}

	.navigation {
		margin: auto;
		/* Safe space for mobile devices with home bar */
		bottom: 1rem;
	}
</style>
