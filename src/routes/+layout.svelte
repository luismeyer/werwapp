<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import Forest from '../components/forest.svelte';
	import Toast from '../components/toast.svelte';
	import Narrator from '../components/game/narrator.svelte';

	import { t } from '$lib/stores/translations.svelte';
	import { gameState } from '$lib/stores/game.svelte';
	import { registerSwipeGestures } from '$lib/swipe';

	interface Props {
		children?: import('svelte').Snippet;
	}

	const { children }: Props = $props();

	const tabs = [
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
				if (gameState.isNarratorVisible) {
					gameState.isNarratorVisible = false;
					return;
				}

				if (activeTab === 0) {
					changeTab(activeTab + 1);
					return;
				}
			},
			handleRight: () => {
				if (activeTab === 0 && gameState.state === 'running') {
					gameState.isNarratorVisible = true;
					return;
				}

				if (activeTab === 1) {
					changeTab(activeTab - 1);
				}
			}
		});
	});
</script>

<div class="drawer">
	<input
		id="my-drawer"
		type="checkbox"
		class="drawer-toggle"
		bind:checked={gameState.isNarratorVisible}
	/>

	<div class="drawer-content">
		<div id="main" class="content gap-5">
			<header>
				<div class="flex justify-around py-5">
					<h1 class="text-5xl font-bold">{t('game.name')}</h1>
				</div>
			</header>

			<main>
				{@render children?.()}
			</main>

			<Forest />
		</div>

		<div class="btm-nav navigation theme">
			{#each tabs as tab, index}
				<button class="theme" onclick={() => changeTab(index)} class:active={index === activeTab}>
					{t(tab.name)}
				</button>
			{/each}
		</div>
	</div>

	<div class="drawer-side force-top">
		<label for="my-drawer" class="drawer-overlay"></label>

		<div class="w-screen bg-base-100">
			<Narrator />
		</div>
	</div>
</div>

<Toast />

<style>
	.content {
		display: grid;
		width: 100vw;
		/* Substract height of bottom nav */
		height: calc(100dvh - 9rem);
		grid-template-rows: auto 1fr;
		position: relative;
		overflow-y: scroll;
	}

	.navigation {
		margin: auto;
		/* Safe space for mobile devices with home bar */
		bottom: 1rem;
	}

	.force-top {
		z-index: 100;
	}
</style>
