<script lang="ts">
	import type { PlayerRole } from '$lib/stores/game';

	export const onIndicatorClick: ((event: MouseEvent) => void) | undefined = undefined;
	export const indicatorDisabled: boolean | undefined = undefined;

	export let role: PlayerRole;
</script>

<div>
	<button on:click class="avatar indicator">
		<button
			disabled={indicatorDisabled}
			on:click={onIndicatorClick}
			class="indicator-item badge badge-secondary"
		>
			{role.amount}
		</button>

		<div class="rounded w-24">
			<img alt="{role.name} character image" src={role.image} />
		</div>
	</button>
</div>
