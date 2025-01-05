<script lang="ts">
	import { gameStore } from '$lib/stores/game.svelte';
	import { t } from '$lib/stores/translations';
	import { dayPlayer, nightPlayer } from '$lib/stores/player.svelte';

	import About from './about.svelte';
	import Support from './support.svelte';

	const iconColor = 'hsl(var(--pc) / var(--tw-text-opacity))';

	// biome-ignore lint/style/useConst: TODO: fix
	let isAboutModalOpen = $state(false);

	const reset = () => {
		gameStore.reset();
		dayPlayer.stop();
		nightPlayer.stop();
	};
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 gap-7">
	<!-- Support item -->
	<label for="qa-modal" class="cursor-pointer flex flex-col items-center gap-1">
		<label for="qa-modal" class="btn btn-primary">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill={iconColor}
			>
				<path
					d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4 1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10z"
				/>
			</svg>
		</label>

		<span class="label-text text-center">{$t('settings.qa')}</span>
	</label>

	<!-- Reset item -->
	<label for="reset-modal" class="cursor-pointer flex flex-col items-center gap-1">
		<label for="reset-modal" class="btn btn-primary">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill={iconColor}
			>
				<path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z" />
				<path
					d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"
				/>
			</svg>
		</label>

		<span class="label-text primary-label text-center">{$t('settings.reset')}</span>
	</label>

	<!-- About item -->
	<label for="about-modal" class="cursor-pointer flex flex-col items-center gap-1">
		<label for="about-modal" class="btn btn-primary">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill={iconColor}
			>
				<path
					d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
				/>
				<path d="M11 11h2v6h-2zm0-4h2v2h-2z" />
			</svg>
		</label>

		<span class="label-text primary-label text-center">{$t('settings.about.button')}</span>
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

<!-- Reset Modal -->
<input type="checkbox" id="reset-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">{$t('reset.headline')}</h3>

		<p class="pt-5 pb-10">
			{$t('reset.body')}
		</p>

		<div class="flex justify-evenly gap-2">
			<button onclick={reset} onkeypress={reset} class="btn">
				{$t('reset.yes')}
			</button>

			<label for="reset-modal" class="btn btn-primary">
				{$t('reset.no')}
			</label>
		</div>
	</div>
</div>

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
