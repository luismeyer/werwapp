<script lang="ts">
	import { startNextGamePhase } from '$lib/game';
	import { gameStore, type UtilityRole } from '$lib/stores/game.svelte';
	import { t } from '$lib/stores/translations';
	import { getNextGameRole, showRole } from '$lib/roles';

	interface Props {
		role: UtilityRole;
	}

	const { role }: Props = $props();

	const nextRole = $derived($getNextGameRole(role));

	const title = role.name === 'day' ? $t('narrator.headline.day') : $t('narrator.headline.night');

	const changeMusic = async () => {
		gameStore.updateStore({ isNarratorVisible: false });

		await startNextGamePhase();

		gameStore.updateStore({ isNarratorVisible: true, currentRole: nextRole });
	};
</script>

<div class="card shadow-xl bg-primary text-primary-content">
	<div class="card-body items-center text-center">
		<h1 class="card-title text-5xl">{title}</h1>

		<div class="card-actions w-full mt-6">
			{#if $gameStore.phase === role.name}
				<button class="btn btn-secondary w-full" onclick={() => showRole(nextRole)}>
					{$t('narrator.next')}
				</button>
			{/if}

			{#if $gameStore.phase !== role.name}
				<button class="btn btn-secondary w-full" onclick={changeMusic}>
					{$t('narrator.music.button')}
				</button>
			{/if}
		</div>
	</div>
</div>
