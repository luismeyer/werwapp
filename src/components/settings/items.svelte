<script lang="ts">
	import { resetGame } from '$lib/stores/game.svelte';
	import { t } from '$lib/stores/translations.svelte';
	import { dayPlayer, nightPlayer } from '$lib/stores/player.svelte';

	import About from './about.svelte';
	import Support from './support.svelte';
	import { goto } from '$app/navigation';
	import { Headset, Info, RotateCcw } from '@lucide/svelte';

	const iconColor = 'hsl(var(--pc) / var(--tw-text-opacity))';

	// biome-ignore lint/style/useConst: TODO: fix
	let isAboutModalOpen = $state(false);

	const reset = () => {
		resetGame();

		dayPlayer.stop();
		nightPlayer.stop();

		goto('/');
	};
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 gap-7">
	<!-- Support item -->
	<label for="qa-modal" class="cursor-pointer flex flex-col items-center gap-1">
		<label for="qa-modal" class="btn btn-primary">
			<Headset />
		</label>

		<span class="label-text text-center">{t('settings.qa')}</span>
	</label>

	<!-- Reset item -->

	<div class="cursor-pointer flex flex-col items-center gap-1">
		<button onmousedown={reset} class="btn btn-primary" aria-labelledby="reset-label">
			<RotateCcw />
		</button>

		<span id="reset-label" class="label-text primary-label text-center">{t('settings.reset')}</span>
	</div>

	<!-- About item -->
	<label for="about-modal" class="cursor-pointer flex flex-col items-center gap-1">
		<label for="about-modal" class="btn btn-primary">
			<Info />
		</label>

		<span class="label-text primary-label text-center">{t('settings.about.button')}</span>
	</label>
</div>

<!-- Support Modal -->
<input type="checkbox" id="qa-modal" class="modal-toggle" />
<label for="qa-modal" class="modal cursor-pointer">
	<label class="modal-box support-modal relative" for="">
		<label for="qa-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

		<Support />
	</label>
</label>

<!-- About Modal -->
<input bind:checked={isAboutModalOpen} type="checkbox" id="about-modal" class="modal-toggle" />
<label for="about-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<label for="about-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

		<About />
	</label>
</label>

<style>
	.support-modal {
		height: 30rem;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
</style>
