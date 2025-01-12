<script lang="ts">
	import { startNextGamePhase } from '$lib/game';
	import { gameState, type UtilityRole } from '$lib/stores/game.svelte';
	import { t } from '$lib/stores/translations.svelte';
	import { getNextGameRole, getPrevGameRole } from '$lib/roles.svelte';

	interface Props {
		role: UtilityRole;
	}

	const { role }: Props = $props();

	const prevRole = $derived(getPrevGameRole(role));
	const nextRole = $derived(getNextGameRole(role));

	const title = role.name === 'day' ? t('narrator.headline.day') : t('narrator.headline.night');
</script>

<div class="card shadow-xl bg-primary text-primary-content">
	<div class="card-body items-center text-center">
		<h1 class="card-title text-5xl">{title}</h1>

		<div class="card-actions w-full mt-6">
			<div class="w-full mt-3 grid grid-flow-col gap-4">
				{#if prevRole && gameState.state !== 'running'}
					<button
						onmousedown={() => (gameState.currentRoleId = prevRole.id)}
						class="btn btn-secondary w-full"
					>
						{t('narrator.prev')}
					</button>
				{/if}

				{#if gameState.state !== 'running' || gameState.phase === role.name}
					<button
						class="btn btn-secondary w-full"
						onmousedown={() => (gameState.currentRoleId = nextRole.id)}
					>
						{t('narrator.next')}
					</button>
				{/if}
			</div>

			{#if gameState.state === 'running' && gameState.phase !== role.name}
				<button class="btn btn-secondary w-full" onmousedown={startNextGamePhase}>
					{t('narrator.music.button')}
				</button>
			{/if}
		</div>
	</div>
</div>
