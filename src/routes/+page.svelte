<script lang="ts">
	import { onMount } from 'svelte';

	import { startFirstNightPhase } from '$lib/game';
	import {
		evilRolesCount,
		getPlayerRoles,
		innocentRolesCount,
		playerRoleRemovable
	} from '$lib/roles.svelte';
	import { gameState, type PlayerRole } from '$lib/stores/game.svelte';
	import { nightPlayer } from '$lib/stores/player.svelte';
	import { t } from '$lib/stores/translations';

	import RoleImage from '../components/role/image.svelte';
	import RoleListItem from '../components/role/list-item.svelte';

	const playerRoles = $derived(getPlayerRoles());

	const roleAmount = $derived(playerRoles.reduce((acc, role) => acc + role.amount, 0));
	const usedRoles = $derived(playerRoles.filter(({ amount }) => amount > 0));

	const { ready } = nightPlayer;

	const playerRolesValid = $derived.by(() => {
		const evils = evilRolesCount(playerRoles);
		const innocents = innocentRolesCount(playerRoles);

		return evils > 0 && innocents > 0 && innocents > evils;
	});

	const addablePlayerRoles = $derived(
		playerRoles.filter((role: PlayerRole): boolean => {
			const evils = evilRolesCount(playerRoles);
			const innocents = innocentRolesCount(playerRoles);

			if (!role.addable) {
				return role.amount === 0;
			}

			if (role.isEvil) {
				// there is alway one more werewolf than other roles
				return innocents > evils + 1;
			}

			return true;
		})
	);

	onMount(async () => {
		nightPlayer.loadSong();
	});
</script>

<div class="h-full flex flex-col items-center justify-between">
	<div>
		<h2 class="mb-4">{roleAmount} {$t('narrator.selected')}</h2>

		<div class="grid grid-cols-3 sm:grid-cols-4 gap-5">
			{#each usedRoles as role}
				<RoleImage
					{role}
					indicatorDisabled={!playerRoleRemovable(role)}
					onIndicatorClick={() => {
						if (!role.amount || role.amount === 0) {
							return;
						}

						role.amount = role.amount - 1;
					}}
					onclick={() => {
						gameState.currentRole = role;
						gameState.isNarratorVisible = true;
					}}
				/>
			{/each}
		</div>
	</div>

	<div class="flex gap-5">
		<button
			class="btn btn-primary"
			disabled={!playerRolesValid || !$ready}
			onclick={startFirstNightPhase}
		>
			{$t('game.start')}
		</button>

		<div class="dropdown dropdown-top dropdown-end">
			<div tabindex="0" role="button" class="btn btn-primary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill={'hsl(var(--nc) / var(--tw-text-opacity))'}
				>
					<path
						d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm2-10h4V7h2v4h4v2h-4v4h-2v-4H7v-2z"
					/>
				</svg>
			</div>

			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<ul tabindex="0" class="dropdown-content menu p-2 w-52 shadow rounded-box mb-1 z-[1]">
				{#each addablePlayerRoles as role}
					<li class="mb-1">
						<RoleListItem
							{role}
							onclick={() => {
								role.amount = (role.amount ?? 0) + 1;
							}}
						/>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
</style>
