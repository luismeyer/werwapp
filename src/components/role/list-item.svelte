<script lang="ts">
	import type { PlayerRole } from '$lib/stores/game.svelte';
	import { t } from '$lib/stores/translations';

	interface Props {
		role: PlayerRole;
		onclick?: () => void;
	}

	const { role, onclick }: Props = $props();

	const name = $derived($t(`narrator.${role.name}.name`));
</script>

<button class="avatar indicator w-full" {onclick}>
	<div class="rounded w-8">
		<img alt="{role.name} character image" src={role.image} />
	</div>

	<span>
		{name}
	</span>
</button>
