<script lang="ts">
	import type { PlayerRole } from '$lib/stores/game.svelte';
	import { t } from '$lib/stores/translations.svelte';

	interface Props {
		role: PlayerRole;
		onclick?: () => void;
	}

	const { role, onclick }: Props = $props();
</script>

<button class="avatar indicator w-full" {onclick}>
	<div class="rounded w-8">
		<img alt="{role.name} character image" src={role.image} />
	</div>

	<span>
		{t(`narrator.${role.name}.name`)}
	</span>
</button>
