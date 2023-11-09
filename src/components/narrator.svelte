<script lang="ts">
	import { activeGameRoles, getUtilityRole } from '$lib/roles';
	import { gameStore } from '$lib/stores/game';
	import { t } from '$lib/stores/translations';

	import RoleUtilCard from './role-util-card.svelte';
	import RoleGameCard from './role-game-card.svelte';

	let cardElements: Record<string, HTMLDivElement> = {};

	const closeLayer = () => {
		gameStore.updateStore({ isNarratorVisible: false });
	};

	$: {
		$gameStore.currentRole &&
			cardElements[$gameStore.currentRole.name]?.scrollIntoView({ behavior: 'smooth' });
	}

	$: {
		const notUtilRole = $gameStore.currentRole?.type !== 'util';

		// update the current role if user clicked sun or moon
		if (notUtilRole && $gameStore.gamestate !== $gameStore.currentRole?.state) {
			const currentRole = getUtilityRole($gameStore.gamestate);
			gameStore.updateStore({ currentRole });
		}
	}
</script>

<div class="flex flex-col justify-between h-screen pb-4">
	<div class="overflow-hidden">
		{#each $activeGameRoles as role}
			<div bind:this={cardElements[role.name]} class="flex items-center justify-center h-full p-4">
				{#if role.type === 'util'}
					<RoleUtilCard {role} />
				{:else}
					<RoleGameCard {role} />
				{/if}
			</div>
		{/each}
	</div>

	<div class="p-4">
		<button class="btn w-full" on:click={closeLayer}>{$t('narrator.close')}</button>
	</div>
</div>
