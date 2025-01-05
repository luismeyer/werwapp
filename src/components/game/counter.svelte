<script lang="ts">
	import { gameState } from '$lib/stores/game.svelte';
	import { t } from '$lib/stores/translations.svelte';
</script>

<div
	class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content w-fit justify-self-center"
>
	<span class="countdown font-mono text-5xl">
		<span style={`--value:${gameState.nightCount};`}></span>
	</span>

	{t('night')}
</div>
