<script lang="ts">
	import { gameState } from '$lib/stores/game.svelte';
	import { dayPlayer, nightPlayer } from '$lib/stores/player.svelte';

	const fillColor = 'hsl(var(--nc) / var(--tw-text-opacity))';

	const currentPlayer = $derived(gameState.phase === 'day' ? dayPlayer : nightPlayer);

	const togglePlayer = () => {
		if (currentPlayer.playing) {
			currentPlayer.pause();
		} else {
			currentPlayer.resume();
		}
	};

	const nextSong = () => {
		currentPlayer.next();
	};
</script>

<div class="h-full flex flex-col gap-2">
	<div class="h-full flex gap-2">
		<div class="btn-group h-full w-full">
			<button class="btn h-full" onmousedown={togglePlayer}>
				{#if currentPlayer.playing}
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

			<button class="btn h-full" disabled={!currentPlayer.nextReady} onmousedown={nextSong}>
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

	<progress class="progress w-full" value={currentPlayer.progress} max={currentPlayer.duration}
	></progress>
</div>
