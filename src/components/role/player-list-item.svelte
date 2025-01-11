<script lang="ts">
	import { t } from '$lib/stores/translations.svelte';
	import type { PlayerRole } from '$lib/stores/game.svelte';

	interface Props {
		role: PlayerRole;
		onAdd?: () => void;
	}

	const { role, onAdd }: Props = $props();
</script>

<button class="avatar indicator w-full p-0" onmousedown={onAdd}>
	<div class="rounded w-8">
		<img alt="{role.name} character image" src={role.image} />
	</div>

	<span>
		{t(`narrator.${role.name}.name`)}
	</span>
</button>
