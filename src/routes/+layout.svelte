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
		<svg
			class="fill-primary size-6"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path
				d="M19 2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2zm0 14H5V5c0-.806.55-.988 1-1h13v12z"
			></path>
		</svg>
	</button>

	<button
		class="theme text-primary"
		onmousedown={() => changeTab(1)}
		class:active={activeTab === 1}
		aria-label="game"
	>
		<svg
			class="fill-primary size-6"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path
				d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
			></path>
			<path d="m9 17 8-5-8-5z"></path>
		</svg>
	</button>

	<button
		class="theme text-primary"
		onmousedown={() => changeTab(2)}
		class:active={activeTab === 2}
		aria-label="settings"
	>
		<svg
			class="fill-primary size-6"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path
				d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"
			></path>
			<path
				d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"
			></path>
		</svg>
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
