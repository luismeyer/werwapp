<script lang="ts">
	import { startNextGamePhase } from '$lib/game';
	import { gameStore, type UtilityRole } from '$lib/stores/game';
	import { t } from '$lib/stores/translations';
	import { getNextRole, showRole } from '$lib/roles';

	export let role: UtilityRole;

	$: nextRole = getNextRole(role);

	const title = role.name === 'day' ? $t('narrator.headline.day') : $t('narrator.headline.night');

	const changeMusic = () => {
		gameStore.updateStore({ isNarratorVisible: false });

		startNextGamePhase();
	};
</script>

<div class="card shadow-xl bg-primary text-primary-content">
	<div class="card-body items-center text-center">
		<h1 class="card-title text-5xl">{title}</h1>

		<div class="card-actions w-full mt-6">
			{#if $gameStore.gamestate === role.name}
				<button class="btn btn-secondary w-full" on:click={() => showRole(nextRole)}>
					{$t('narrator.next')}
				</button>
			{/if}

			{#if $gameStore.gamestate !== role.name}
				<button class="btn btn-secondary w-full" on:click={changeMusic}>
					{$t('narrator.music.button')}
				</button>
			{/if}
		</div>
	</div>
</div>
