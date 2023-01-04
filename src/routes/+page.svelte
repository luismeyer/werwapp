<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { t } from '../lib/translation/i18n';
	import Game from '../components/game.svelte';
	import Settings from '../components/settings.svelte';
	import '../app.css';
	import { CrossFade, Player } from 'tone';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});

	let tabs = ['game', 'settings'];
	let activeTab = 0;

	let crossFade: CrossFade;
	let dayTone: Player;
	let nightTone: Player;

	const startGame = async () => {
		crossFade = new CrossFade().toDestination();
		dayTone = new Player();
		nightTone = new Player();

		nightTone.loop = true;

		// bind day to 0
		dayTone.connect(crossFade.a);

		// bind night to 1
		nightTone.connect(crossFade.b);

		crossFade.fade.value = 1;
	};
</script>

<header>
	<div class="flex justify-around py-5">
		<h1 class="text-5xl font-bold">{$t('game.name')}</h1>
	</div>
</header>

<main class="px-8 pt-8">
	{#if activeTab === 0}
		{#if !crossFade || !dayTone || !nightTone}
			<button on:click={startGame} class="btn btn-primary">Start Game</button>
		{:else}
			<Game {crossFade} {dayTone} {nightTone} />
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
