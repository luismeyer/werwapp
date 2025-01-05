<script lang="ts">
	import type { PlayerRole } from '$lib/stores/game.svelte';

	export let role: PlayerRole;
</script>

<button on:click class="avatar indicator">
	<span class="indicator-item badge badge-secondary">
		{role.amount}
	</span>

	<div class="rounded w-24">
		<img alt="{role.name} character image" src={role.image} />
	</div>
</button>
