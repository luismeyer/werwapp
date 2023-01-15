<script lang="ts">
	import { t } from '$lib/stores/i18n';

	import Forest from '../components/forest.svelte';
	import Settings from '../components/settings.svelte';
	import Toast from '../components/toast.svelte';
	import Setup from '../components/setup.svelte';

	import '../app.css';

	type Tab = 'game' | 'settings';

	let tabs: Tab[] = ['game', 'settings'];
	let activeTab = 0;
</script>

<div class="content">
	<header>
		<div class="flex justify-around py-5">
			<h1 class="text-5xl font-bold">{$t('game.name')}</h1>
		</div>
	</header>

	<main>
		{#if activeTab === 0}
			<Setup />
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

<Toast />

<style>
	.content {
		display: grid;
		width: 100vw;
		/* Substract height of bottom nav */
		height: calc(100dvh - 5rem);
		grid-template-rows: auto 1fr;
		position: relative;
		overflow: scroll;
	}

	.navigation {
		margin: auto;
		/* Safe space for mobile devices with home bar */
		bottom: 1rem;
	}
</style>
