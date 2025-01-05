<script lang="ts">
	import type { PlayerRole } from '$lib/stores/game.svelte';

	interface Props {
		role: PlayerRole;
		onclick?: () => void;
		indicatorDisabled?: boolean;
		onIndicatorClick?: () => void;
	}

	const { role, onclick, onIndicatorClick, indicatorDisabled }: Props = $props();
</script>

<div class="indicator">
	<button
		disabled={indicatorDisabled}
		onclick={onIndicatorClick}
		class="indicator-item badge badge-secondary"
	>
		{role.amount}
	</button>

	<button {onclick} class="avatar">
		<div class="rounded w-24">
			<img alt="{role.name} character image" src={role.image} />
		</div>
	</button>
</div>
