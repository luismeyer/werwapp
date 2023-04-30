<script lang="ts">
	import { gameStore } from '$lib/stores/game';

	import Game from './game.svelte';
	import RolesSetup from './roles-setup.svelte';
</script>

{#if $gameStore.state !== 'running'}
	<RolesSetup />
{:else}
	<Game />
{/if}
