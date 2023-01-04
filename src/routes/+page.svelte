<script lang="ts">
	import { t, locale, locales } from '../lib/translation/i18n';
	import Game from '../components/game.svelte';
	import Settings from '../components/settings.svelte';

	import '../app.css';

	let tabs = ['game', 'settings'];
	let activeTab = 0;
</script>

<header>
	<div class="flex justify-around py-5">
		<h1 class="text-5xl font-bold">{$t('game.name')}</h1>
	</div>
</header>
<main>
	<div class="px-8 pt-8">
		{#if activeTab === 0}
			<Game />
		{:else if activeTab === 1}
			<Settings />
		{/if}
	</div>
</main>

<div class="btm-nav">
	{#each tabs as tab, index}
		<button on:click={() => (activeTab = index)} class:active={index === activeTab}
			>{$t(tab)}</button
		>
	{/each}
</div>
