<script lang="ts">
	import type { GameRole } from '$lib/stores/game';

	export let role: GameRole;
</script>

<div class="avatar indicator">
	{#if role.amount > 1}
		<span class="indicator-item badge badge-secondary">{role.amount}</span>
	{/if}

	<div class="rounded w-24">
		<img alt="char" src={`/chars/${role.name}.png`} />
	</div>
</div>
