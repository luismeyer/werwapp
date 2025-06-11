<script lang="ts">
	import { getPlayer } from '$lib/stores/player.svelte';
	import { Pause, Play, SkipForward } from '@lucide/svelte';

	const fillColor = 'hsl(var(--nc) / var(--tw-text-opacity))';

	const player = $derived(getPlayer());

	const togglePlayer = () => {
		if (player.playing) {
			player.pause();
		} else {
			player.resume();
		}
	};

	const nextSong = () => {
		player.next();
	};
</script>

<div class="h-full flex flex-col gap-2">
	<div class="h-full flex gap-2">
		<div class="w-full grid grid-cols-2 gap-2">
			<button class="btn h-full" onmousedown={togglePlayer}>
				{#if player.playing}
					<Pause />
				{:else}
					<Play />
				{/if}
			</button>

			<button class="btn h-full w-full" disabled={!player.nextReady} onmousedown={nextSong}>
				<SkipForward />
			</button>
		</div>
	</div>

	<progress class="progress w-full" value={player.progress} max={player.duration}></progress>
</div>
