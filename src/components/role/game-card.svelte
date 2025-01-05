<script lang="ts">
	import { gameState, type PlayerRole } from '$lib/stores/game.svelte';
	import { t } from '$lib/stores/translations.svelte';
	import { getNextGameRole, getPrevGameRole, showRole } from '$lib/roles.svelte';

	import RoleImage from './image.svelte';

	interface Props {
		role: PlayerRole;
	}

	const { role }: Props = $props();

	const nextRole = $derived(getNextGameRole(role));
	const prevRole = $derived(getPrevGameRole(role));

	const title = $derived(
		t(
			role.amount === 1 ? `narrator.headline.singular.${role.prefix}` : 'narrator.headline.plural',
			{
				role:
					role.amount === 1
						? t(`narrator.${role.name}.name`)
						: t(`narrator.${role.name}.name.plural`)
			}
		)
	);
</script>

<div class="card shadow-xl bg-primary text-primary-content">
	<figure class="px-10 pt-10">
		<RoleImage {role} />
	</figure>

	<div class="card-body items-center text-center">
		<h2 class="card-title">{title}</h2>
		<p class="max-w-sm">{t(`narrator.${role.name}.description`)}</p>

		<div class="w-full mt-6 grid grid-flow-col gap-4">
			{#if prevRole}
				<button onclick={() => showRole(prevRole)} class="btn btn-secondary w-full">
					{t('narrator.prev')}
				</button>
			{/if}

			<div class="indicator w-full">
				{#if nextRole.type === 'player' && nextRole.combinedWith === role.name}
					<span class="indicator-item badge badge-accent bounce">1</span>
				{/if}

				<button onclick={() => showRole(nextRole)} class="btn btn-secondary w-full">
					{t('narrator.next')}
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.bounce {
		animation: bounce 1s ease infinite;
	}

	@keyframes bounce {
		0% {
			top: 0px;
		}
		20% {
			top: -15px;
		}
		40% {
			top: 0px;
		}
		60% {
			top: -7px;
		}
		80% {
			top: 0px;
		}
		100% {
			top: -3px;
		}
	}
</style>
