<script lang="ts">
	import '../app.css';

	import type { Snippet } from 'svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import Forest from '../components/forest.svelte';
	import Toast from '../components/toast.svelte';

	import { deserializeGameState, gameState } from '$lib/stores/game.svelte';
	import { registerSwipeGestures } from '$lib/swipe';
	import type { LayoutData } from './$types';
	import { localeState } from '$lib/stores/i18n.svelte';
	import { deserializeThemeState, themeState } from '$lib/stores/theme.svelte';
	import { deserializeWakelockState } from '$lib/stores/wakelock.svelte';
	import { BookOpen, Play, Settings } from '@lucide/svelte';

	const { data, children }: { data: LayoutData; children: Snippet } = $props();

	localeState.locale = data.locale;

	if (data.wakelock) {
		deserializeWakelockState(data.wakelock);
	}

	if (data.theme) {
		deserializeThemeState(data.theme);
	}

	if (data.game) {
		deserializeGameState(data.game);
	}

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

	registerSwipeGestures({
		handleLeft: () => {
			if (activeTab >= 2) {
				return;
			}

			changeTab(activeTab + 1);
		},
		handleRight: () => {
			if (activeTab <= 0) {
				return;
			}

			changeTab(activeTab - 1);
		}
	});

	const currentTheme = $derived(
		themeState.autoSwitching && gameState.phase === 'day'
			? themeState.lightTheme
			: themeState.darkTheme
	);
</script>

<main class="page pt-5 w-screen">
	{@render children?.()}
</main>

<Forest />

<div class="btm-nav navigation theme">
	<button
		class="theme text-primary"
		onmousedown={() => changeTab(0)}
		class:active={activeTab === 0}
		aria-label="narrator"
	>
		<BookOpen />
	</button>

	<button
		class="theme text-primary"
		onmousedown={() => changeTab(1)}
		class:active={activeTab === 1}
		aria-label="game"
	>
		<Play />
	</button>

	<button
		class="theme text-primary"
		onmousedown={() => changeTab(2)}
		class:active={activeTab === 2}
		aria-label="settings"
	>
		<Settings />
	</button>
</div>

<Toast />

<input type="checkbox" checked value={currentTheme} class="toggle theme-controller hidden" />

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
