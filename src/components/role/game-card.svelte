<script lang="ts">
	import { gameStore, type PlayerRole } from '$lib/stores/game';
	import { t } from '$lib/stores/translations';
	import { getNextGameRole, getPrevGameRole, showRole } from '$lib/roles';

	import RoleImage from './image.svelte';

	export let role: PlayerRole;

	$: nextRole = $getNextGameRole(role);
	$: prevRole = $getPrevGameRole(role);

	$: name =
		role.amount === 1 ? $t(`narrator.${role.name}.name`) : $t(`narrator.${role.name}.name.plural`);

	$: description = $t(`narrator.${role.name}.description`);

	$: title = $t(
		role.amount === 1 ? `narrator.headline.singular.${role.prefix}` : 'narrator.headline.plural',
		{ role: name }
	);
</script>

<div class="card shadow-xl bg-primary text-primary-content">
	<figure class="px-10 pt-10">
		<RoleImage {role} />
	</figure>

	<div class="card-body items-center text-center">
		<h2 class="card-title">{title}</h2>
		<p class="max-w-sm">{description}</p>

		{#if $gameStore.state === 'running'}
			<div class="w-full mt-6 grid grid-flow-col gap-4">
				{#if prevRole}
					<button on:click={() => showRole(prevRole)} class="btn btn-secondary w-full">
						{$t('narrator.prev')}
					</button>
				{/if}

				<div class="indicator w-full">
					{#if nextRole.type === 'player' && nextRole.combinedWith === role.name}
						<span class="indicator-item badge badge-accent bounce">1</span>
					{/if}

					<button on:click={() => showRole(nextRole)} class="btn btn-secondary w-full">
						{$t('narrator.next')}
					</button>
				</div>
			</div>
		{/if}
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
