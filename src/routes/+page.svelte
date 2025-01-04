<script lang="ts">
	import { onMount } from 'svelte';

	import { translationsStore } from '$lib/stores/translations';
	import { startFirstNightPhase } from '$lib/game';
	import {
		addablePlayerRoles,
		playerRoleRemovable,
		playerRolesArray,
		playerRolesValid
	} from '$lib/roles';
	import { gameStore, type PlayerRole } from '$lib/stores/game';
	import { nightPlayer } from '$lib/stores/player';
	import { t } from '$lib/stores/translations';

	import RoleImage from '../components/role/image.svelte';
	import RoleListItem from '../components/role/list-item.svelte';

	const removeRole = (role: PlayerRole) => (event: MouseEvent) => {
		event.stopPropagation();

		if (!role.amount || role.amount === 0) {
			return;
		}

		role.amount = role.amount - 1;
		$gameStore.roles.add(role);

		gameStore.updateStore({ roles: $gameStore.roles });
	};

	const addRole = (role: PlayerRole) => () => {
		role.amount = (role.amount ?? 0) + 1;
		$gameStore.roles.add(role);

		gameStore.updateStore({ roles: $gameStore.roles });
	};

	const showRole = (role: PlayerRole) => () => {
		gameStore.updateStore({
			currentRole: role,
			isNarratorVisible: true
		});
	};

	$: roleAmount = $playerRolesArray.reduce((acc, role) => acc + role.amount, 0);
	$: usedRoles = $playerRolesArray.filter(({ amount }) => amount > 0);

	$: ({ ready } = nightPlayer);

	onMount(async () => {
		nightPlayer.loadSong();
	});
</script>

{#if !$translationsStore}
	<div class="loadingContainer">loading...</div>
{:else}
	<!-- This is needed because daisy ui requires the tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

	<div class="h-full flex flex-col items-center justify-between">
		<div>
			<h2 class="mb-4">{roleAmount} {$t('narrator.selected')}</h2>

			<div class="grid grid-cols-3 sm:grid-cols-4 gap-5">
				{#each usedRoles as role}
					<RoleImage
						on:click={showRole(role)}
						indicatorDisabled={!$playerRoleRemovable(role)}
						onIndicatorClick={removeRole(role)}
						{role}
					/>
				{/each}
			</div>
		</div>

		<div class="flex gap-5">
			<button
				class="btn btn-primary"
				disabled={!$playerRolesValid || !$ready}
				on:click={startFirstNightPhase}
			>
				{$t('game.start')}
			</button>

			<div class="dropdown dropdown-top dropdown-end">
				<label tabindex="0" class="btn">
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
				</label>

				<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box mb-1">
					{#each $addablePlayerRoles as role}
						<li class="mb-1">
							<RoleListItem on:click={addRole(role)} {role} />
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
{/if}

<style>
	.loadingContainer {
		display: grid;
		place-items: center;
		height: 100%;
	}
</style>
