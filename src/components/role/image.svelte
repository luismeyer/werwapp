<script lang="ts">
	import type { PlayerRole } from '$lib/stores/game';

	export let onIndicatorClick: (event: MouseEvent) => void;
	export let indicatorDisabled: boolean;

	export let role: PlayerRole;
</script>

<button on:click class="avatar indicator">
	<button
		disabled={indicatorDisabled}
		on:click={onIndicatorClick}
		class="indicator-item badge badge-secondary custom-indicator"
	>
		{role.amount}
	</button>

	<div class="rounded w-24">
		<img alt="{role.name} character image" src={role.image} />
	</div>
</button>

<style>
	.custom-indicator {
		width: 30px;
		height: 30px;
		top: 5px;
		right: 5px;
	}
</style>
