<script lang="ts">
	import { gameStore } from '$lib/stores/game';
	import { currentPlayer } from '$lib/stores/player';

	const fillColor = `hsl(var(--nc) / var(--tw-text-opacity))`;

	$: ({ playing, progress, duration, nextReady } = $currentPlayer);

	const togglePlayer = () => {
		if ($playing) {
			$currentPlayer.pause();
		} else {
			$currentPlayer.resume();
		}
	};

	const nextSong = () => {
		$currentPlayer.next();
	};

	const toggleNarrator = () => {
		gameStore.updateStore({ isNarratorVisible: !$gameStore.isNarratorVisible });
	};
</script>

<div class="h-full flex flex-col gap-2">
	<div class="h-full flex gap-2">
		<div class="btn-group h-full w-full">
			<button class="btn h-full" on:click={togglePlayer}>
				{#if $playing}
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

			<button class="btn h-full" disabled={!$nextReady} on:click={nextSong}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill={fillColor}
				>
					<path d="M7 7v10l7-5zm9 10V7h-2v10z" />
				</svg>
			</button>
		</div>

		<button class="btn h-full" on:click={toggleNarrator}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 24 24"
				fill={fillColor}
			>
				<path
					d="M21 3h-7a2.98 2.98 0 0 0-2 .78A2.98 2.98 0 0 0 10 3H3a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h5.758a2.01 2.01 0 0 1 1.414.586l1.121 1.121c.009.009.021.012.03.021.086.08.182.15.294.196h.002a.996.996 0 0 0 .762 0h.002c.112-.046.208-.117.294-.196.009-.009.021-.012.03-.021l1.121-1.121A2.01 2.01 0 0 1 15.242 20H21a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 15h-4.758a4.03 4.03 0 0 0-2.242.689V6c0-.551.448-1 1-1h6v13z"
				/>
			</svg>
		</button>
	</div>

	<progress class="progress w-full" value={$progress} max={$duration} />
</div>
