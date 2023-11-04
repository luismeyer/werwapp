<script lang="ts">
	import type { PlayerRole } from '$lib/stores/game';

	export let role: PlayerRole;
</script>

<div class="avatar indicator">
	{#if role.amount > 1}
		<span class="indicator-item badge badge-secondary">{role.amount}</span>
	{/if}

	<div class="rounded w-24">
		<img alt="char" src={`/chars/${role.name}.png`} />
	</div>
</div>
