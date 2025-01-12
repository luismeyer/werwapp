<script lang="ts">
	import { onMount } from 'svelte';

	import {
		evilRolesCount,
		getPlayerRoles,
		innocentRolesCount,
		playerRoleRemovable
	} from '$lib/roles.svelte';
	import { gameState, type PlayerRole } from '$lib/stores/game.svelte';
	import { nightPlayer } from '$lib/stores/player.svelte';
	import { t } from '$lib/stores/translations.svelte';

	import RoleImage from '../components/role/image.svelte';
	import PlayerListItem from '../components/role/player-list-item.svelte';
	import { goto } from '$app/navigation';

	const playerRoles = $derived(getPlayerRoles());

	const roleAmount = $derived(playerRoles.reduce((acc, role) => acc + role.amount, 0));
	const usedRoles = $derived(playerRoles.filter(({ amount }) => amount > 0));

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
		if (gameState.state === 'running') {
			goto('/game');
		}

		if (nightPlayer.ready) {
			return;
		}

		nightPlayer.loadSong();
	});
</script>

<div class="h-full flex flex-col items-center justify-between">
	<div>
		<h2 class="mb-4">{roleAmount} {t('narrator.selected')}</h2>

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
					onImageClick={() => {
						gameState.currentRoleId = role.id;
						goto('/narrator');
					}}
				/>
			{/each}
		</div>
	</div>

	<div class="flex gap-5 items-center">
		<button
			class="btn btn-primary"
			disabled={!playerRolesValid || !nightPlayer.ready}
			onmousedown={() => {
				gameState.state = 'running';

				void nightPlayer.play();

				goto('/game');
			}}
		>
			{t('game.start')}
		</button>

		<details class="dropdown dropdown-top dropdown-end">
			<summary class="btn btn-secondary m-1">
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
			</summary>

			<ul
				class="dropdown-content menu w-52 shadow-sm rounded-box z-[100] bg-secondary text-secondary-content gap-3 p-3"
			>
				{#each addablePlayerRoles as role}
					<li>
						<PlayerListItem
							{role}
							onAdd={() => {
								role.amount = (role.amount ?? 0) + 1;
							}}
						/>
					</li>
				{/each}
			</ul>
		</details>
	</div>
</div>

<style>
</style>
