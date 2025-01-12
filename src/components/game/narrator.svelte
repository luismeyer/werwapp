<script lang="ts">
	import { getActiveGameRoles } from '$lib/roles.svelte';
	import { gameState } from '$lib/stores/game.svelte';

	import RoleUtilCard from '../role/util-card.svelte';
	import RoleGameCard from '../role/game-card.svelte';
	import { onMount } from 'svelte';

	const cardElements: Record<string, HTMLDivElement> = $state({});

	// instant scroll if user is navigating
	onMount(() => {
		if (!gameState.currentRoleId) {
			return;
		}

		cardElements[gameState.currentRoleId]?.scrollIntoView();
	});

	// smooth scroll if user is on page
	$effect(() => {
		if (!gameState.currentRoleId) {
			return;
		}

		cardElements[gameState.currentRoleId]?.scrollIntoView({ behavior: 'smooth' });
	});

	const activeGameRoles = $derived(getActiveGameRoles());
</script>

<div class="flex flex-col justify-between pb-4 h-full">
	<div class="overflow-hidden" style="off">
		{#each activeGameRoles as role}
			<div bind:this={cardElements[role.id]} class="flex items-center justify-center h-full p-4">
				{#if role.type === 'util'}
					<RoleUtilCard {role} />
				{:else}
					<RoleGameCard {role} />
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
</style>
