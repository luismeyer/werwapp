<script lang="ts">
import { Plus as AddIcon, RotateCcw as ResetIcon } from "@lucide/svelte";
import { onMount } from "svelte";
import { goto } from "$app/navigation";
import {
	evilRolesCount,
	getPlayerRoles,
	innocentRolesCount,
	playerRoleRemovable,
} from "$lib/roles.svelte";
import { gameState, type PlayerRole, resetGame } from "$lib/stores/game.svelte";
import { dayPlayer } from "$lib/stores/player.svelte";
import { t } from "$lib/stores/translations.svelte";
import RoleImage from "../components/role/image.svelte";
import PlayerListItem from "../components/role/player-list-item.svelte";

const playerRoles = $derived(getPlayerRoles());

const roleAmount = $derived(
	playerRoles.reduce((acc, role) => acc + role.amount, 0),
);
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
	}),
);

onMount(async () => {
	if (gameState.state === "running") {
		goto("/game");
	}

	if (dayPlayer.ready) {
		return;
	}

	dayPlayer.loadSong();
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

	<div class="flex gap-2 items-center pb-8">
		<button
			class="btn btn-primary m-1"
			disabled={!playerRolesValid || !dayPlayer.ready}
			onmousedown={() => {
				gameState.state = 'running';

				void dayPlayer.play();

				goto('/game');
			}}
		>
			{t('game.start')}
		</button>

		<button
			class="btn btn-primary m-1"
			onmousedown={() => {
				resetGame();
			}}
		>
			<ResetIcon />
		</button>

		<details class="dropdown dropdown-end dropdown-top">
			<summary class="btn btn-secondary m-1">
				<AddIcon />
			</summary>

			<ul
				class="dropdown-content menu w-52 shadow-sm rounded-box z-100 bg-secondary text-secondary-content gap-1"
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
