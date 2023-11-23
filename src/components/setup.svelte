<script lang="ts">
	import { gameStore } from '$lib/stores/game';
	import { rolesStore } from '$lib/stores/roles';
	import { translationsStore } from '$lib/stores/translations';

	import Game from './game.svelte';
	import RolesSetup from './roles-setup.svelte';
</script>

{#if !$translationsStore || !$rolesStore}
	<div class="loadingContainer">loading...</div>
{:else if $gameStore.state !== 'running'}
	<RolesSetup />
{:else}
	<Game />
{/if}

<style>
	.loadingContainer {
		display: grid;
		place-items: center;
		height: 100%;
	}
</style>
