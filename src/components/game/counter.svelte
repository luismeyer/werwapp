<script lang="ts">
	import { gameStore } from '$lib/stores/game.svelte';
	import { t } from '$lib/stores/translations';
</script>

<div
	class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content w-fit justify-self-center"
>
	<span class="countdown font-mono text-5xl">
		<span style={`--value:${$gameStore.nightCount};`}></span>
	</span>

	{$t('night')}
</div>
