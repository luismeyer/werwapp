<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import Forest from '../components/forest.svelte';
	import Toast from '../components/toast.svelte';

	import { t } from '$lib/stores/translations.svelte';
	import { gameState } from '$lib/stores/game.svelte';
	import { registerSwipeGestures } from '$lib/swipe';

	interface Props {
		children?: import('svelte').Snippet;
	}

	const { children }: Props = $props();

	const tabs = [
		{ route: ['narrator'], name: 'narrator' },
		{ route: ['', 'game'], name: 'game' },
		{ route: ['settings'], name: 'settings' }
	];

	const activeTab = $derived(
		tabs.findIndex(({ route }) => route.includes(page.url.pathname.slice(1)))
	);

	const changeTab = (index: number) => {
		const newTab = tabs[index];

		let route = `/${newTab.route[0]}`;
		if (newTab.name === 'game' && gameState.state === 'running') {
			route = '/game';
		}

		goto(route);
	};

	onMount(() => {
		registerSwipeGestures({
			handleLeft: () => {
				if (activeTab === 0) {
					changeTab(activeTab + 1);
					return;
				}
			},
			handleRight: () => {
				if (activeTab === 1) {
					changeTab(activeTab - 1);
				}
			}
		});
	});
</script>

<main class="page pt-5 w-screen">
	{@render children?.()}
</main>

<Forest />

<div class="btm-nav navigation theme">
	{#each tabs as tab, index}
		<button class="theme" onclick={() => changeTab(index)} class:active={index === activeTab}>
			{t(tab.name)}
		</button>
	{/each}
</div>

<Toast />

<style>
	.page {
		/* Substract height of bottom nav */
		height: calc(100dvh - 9rem);
	}

	.navigation {
		margin: auto;
		/* Safe space for mobile devices with home bar */
		bottom: 1rem;
	}
</style>
