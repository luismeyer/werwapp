<script lang="ts">
	import type { PlayerRole } from '$lib/stores/game';

	export let role: PlayerRole;
</script>

<div class="avatar indicator">
	<button on:click class="indicator-item badge badge-secondary">{role.amount}</button>

	<div class="rounded w-24">
		<img alt="{role.name} character image" src={role.image} />
	</div>
</div>
