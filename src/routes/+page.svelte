<script lang="ts">
	import { t, locale, locales } from '../lib/translation/i18n';
	import Game from '../components/game.svelte';
	import Settings from '../components/settings.svelte';

	import '../app.css';

	let tabs = ['game', 'settings'];
	let activeTab = 1;
</script>

<header>
	<div class="flex justify-around">
		<h1 class="text-2xl font-bold">{$t('game.name')}</h1>
	</div>
</header>

{#if activeTab === 0}
	<Game />
{:else if activeTab === 1}
	<Settings />
{/if}

<div class="btm-nav">
	{#each tabs as tab, index}
		<button on:click={() => (activeTab = index)} class:active={index === activeTab}
			>{$t(tab)}</button
		>
	{/each}
</div>
