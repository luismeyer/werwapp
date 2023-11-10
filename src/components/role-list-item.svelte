<script lang="ts">
	import type { PlayerRole } from '$lib/stores/game';
	import { t } from '$lib/stores/translations';

	export let role: PlayerRole;

	$: name = $t(`narrator.${role.name}.name`);
</script>

<button class="avatar indicator w-full" on:click>
	<div class="rounded w-8">
		<img alt="{role.name} character image" src={role.image} />
	</div>

	<span>
		{name}
	</span>
</button>
