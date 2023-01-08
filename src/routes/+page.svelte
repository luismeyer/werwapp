<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { CrossFade, Player, start } from 'tone';

	import { loadRandomSong, type Song } from '$lib/songs/song';
	import { songData } from '$lib/songs/songdata';
	import { t } from '$lib/translation/i18n';

	import Game from '../components/game.svelte';
	import Settings from '../components/settings.svelte';

	import '../app.css';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});

	let tabs = ['game', 'settings'];
	let activeTab = 0;

	let crossFade: CrossFade;
	let dayPlayer: Player;
	let nightPlayer: Player;

	let firstSong: Song;

	let gameStarted = false;

	onMount(async () => {
		crossFade = new CrossFade({ fade: 1 }).toDestination();

		dayPlayer = new Player({ loop: true });

		// bind day to 0
		dayPlayer.connect(crossFade.a);

		nightPlayer = new Player({ loop: true });

		// bind night to 1
		nightPlayer.connect(crossFade.b);

		firstSong = await loadRandomSong(songData.nightSongs, nightPlayer);
	});

	const startGame = async () => {
		await start();

		gameStarted = true;
	};

	$: buttonLabel = firstSong ? 'Start das Spiel' : 'erster Song wird geladen...';
</script>

<header>
	<div class="flex justify-around py-5">
		<h1 class="text-5xl font-bold">{$t('game.name')}</h1>
	</div>
</header>

<main class="px-8 pt-8">
	{#if activeTab === 0}
		{#if !gameStarted}
			<div class="flex justify-center items-center">
				<button disabled={!firstSong} on:click={startGame} class="btn btn-primary">
					{buttonLabel}
				</button>
			</div>
		{:else}
			<Game {firstSong} {crossFade} {dayPlayer} {nightPlayer} />
		{/if}
	{:else if activeTab === 1}
		<Settings />
	{/if}
</main>

<div class="btm-nav">
	{#each tabs as tab, index}
		<button on:click={() => (activeTab = index)} class:active={index === activeTab}>
			{$t(tab)}
		</button>
	{/each}
</div>
