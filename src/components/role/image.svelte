<script lang="ts">
	import type { PlayerRole } from '$lib/stores/game.svelte';

	interface Props {
		role: PlayerRole;
		onImageClick?: () => void;
		indicatorDisabled?: boolean;
		onIndicatorClick?: () => void;
	}

	const { role, onImageClick, onIndicatorClick, indicatorDisabled }: Props = $props();
</script>

<div class="indicator">
	<button
		disabled={indicatorDisabled}
		onmousedown={onIndicatorClick}
		class="indicator-item badge badge-secondary w-6 h-6"
	>
		{role.amount}
	</button>

	<button onmousedown={onImageClick} class="avatar">
		<div class="rounded w-24">
			<img alt="{role.name} character image" src={role.image} />
		</div>
	</button>
</div>
