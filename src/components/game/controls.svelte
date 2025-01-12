<script lang="ts">
	import { getPlayer } from '$lib/stores/player.svelte';

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
		<div class="btn-group h-full w-full">
			<button class="btn h-full" onmousedown={togglePlayer}>
				{#if player.playing}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="48"
						height="48"
						viewBox="0 0 24 24"
						fill={fillColor}
					>
						<path d="M8 7h3v10H8zm5 0h3v10h-3z" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="48"
						height="48"
						viewBox="0 0 24 24"
						fill={fillColor}
					>
						<path d="M7 6v12l10-6z" />
					</svg>
				{/if}
			</button>

			<button class="btn h-full" disabled={!player.nextReady} onmousedown={nextSong}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill={fillColor}
				>
					<title>next</title>
					<path d="M7 7v10l7-5zm9 10V7h-2v10z" />
				</svg>
			</button>
		</div>
	</div>

	<progress class="progress w-full" value={player.progress} max={player.duration}></progress>
</div>
