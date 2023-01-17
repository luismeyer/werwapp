<script lang="ts">
	import * as Tone from 'tone';

	import { shiftQueueIntoPlayer } from '$lib/player';
	import { playerStore } from '$lib/stores/player';

	const fillColor = `hsl(var(--nc) / var(--tw-text-opacity))`;

	const togglePaused = () => {
		const paused = !$playerStore.paused;

		playerStore.update({ paused });

		if (paused) {
			Tone.Transport.pause();
		} else {
			Tone.Transport.start();
		}
	};
</script>

<div class="h-full flex flex-col gap-2">
	<div class="btn-group h-full w-full">
		<button class="btn h-full" on:click={togglePaused}>
			{#if $playerStore.paused}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill={fillColor}
				>
					<path d="M7 6v12l10-6z" />
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill={fillColor}
				>
					<path d="M8 7h3v10H8zm5 0h3v10h-3z" />
				</svg>
			{/if}
		</button>

		<button
			disabled={!$playerStore.queue.buffer}
			class="btn h-full"
			on:click={shiftQueueIntoPlayer}
		>
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

	<div class="flex gap-2 items-center">
		<progress
			class="progress w-full"
			value={$playerStore.progress}
			max={$playerStore.currentSongDuration}
		/>
	</div>
</div>
