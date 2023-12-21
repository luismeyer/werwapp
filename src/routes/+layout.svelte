<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import Forest from '../components/forest.svelte';
	import Toast from '../components/toast.svelte';
	import Narrator from '../components/game/narrator.svelte';

	import { t } from '$lib/stores/translations';
	import { gameStore } from '$lib/stores/game';
	import { registerSwipeGestures } from '$lib/swipe';
	import { themeStore } from '$lib/stores/theme';

	const tabs = [
		{ route: ['', 'game'], name: 'game' },
		{ route: ['settings'], name: 'settings' }
	];

	$: activeTab = tabs.findIndex(({ route }) => route.includes($page.url.pathname.slice(1)));

	const changeTab = (index: number) => {
		const newTab = tabs[index];

		let route: string = `/${newTab.route[0]}`;
		if (newTab.name === 'game' && $gameStore.state === 'running') {
			route = '/game';
		}

		goto(route);
	};

	onMount(() => {
		themeStore.init();

		registerSwipeGestures({
			handleLeft: () => {
				if ($gameStore.isNarratorVisible) {
					gameStore.updateStore({ isNarratorVisible: false });
					return;
				}

				if (activeTab === 0) {
					changeTab(activeTab + 1);
					return;
				}
			},
			handleRight: () => {
				if (activeTab === 0 && $gameStore.state === 'running') {
					gameStore.updateStore({ isNarratorVisible: true });
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
		bind:checked={$gameStore.isNarratorVisible}
	/>

	<div class="drawer-content">
		<div id="main" class="content gap-5">
			<header>
				<div class="flex justify-around py-5">
					<h1 class="text-5xl font-bold">{$t('game.name')}</h1>
				</div>
			</header>

			<main>
				<slot />
			</main>

			<Forest />
		</div>

		<div class="btm-nav navigation theme">
			{#each tabs as tab, index}
				<button class="theme" on:click={() => changeTab(index)} class:active={index === activeTab}>
					{$t(tab.name)}
				</button>
			{/each}
		</div>
	</div>

	<div class="drawer-side force-top">
		<label for="my-drawer" class="drawer-overlay" />

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
