<script lang="ts">
	import { getActiveGameRoles, getUtilityRole } from '$lib/roles.svelte';
	import { gameState } from '$lib/stores/game.svelte';
	import { t } from '$lib/stores/translations.svelte';

	import RoleUtilCard from '../role/util-card.svelte';
	import RoleGameCard from '../role/game-card.svelte';

	const cardElements: Record<string, HTMLDivElement> = $state({});

	const closeLayer = () => {
		gameState.isNarratorVisible = false;
	};

	$effect(() => {
		if (!gameState.currentRole) {
			return;
		}

		cardElements[gameState.currentRole.id]?.scrollIntoView({ behavior: 'smooth' });
	});

	$effect(() => {
		const notUtilRole = gameState.currentRole?.type !== 'util';
		const notSameRole = gameState.phase !== gameState.currentRole?.state;
		const notSetup = gameState.state !== 'setup';

		// update the current role if user clicked sun or moon
		if (notUtilRole && notSameRole && notSetup) {
			gameState.currentRole = getUtilityRole(gameState.phase);
		}
	});

	const activeGameRoles = $derived(getActiveGameRoles());
</script>

<div class="flex flex-col justify-between h-screen pb-4">
	<div class="overflow-hidden">
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

	<div class="p-4">
		<button class="btn w-full" onclick={closeLayer}>{t('narrator.close')}</button>
	</div>
</div>
