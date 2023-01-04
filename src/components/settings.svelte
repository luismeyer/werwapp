<script lang="ts">
	import { t, locale, locales } from '../lib/translation/i18n';

	let toggle_theme = false;
</script>

<main>
	<div class="px-6 pt-6">
		<div class="text-xl font-extrabold">{$t('settings')}</div>
		<div class="text-base-content/70 my-4 text-xs">
			{$t('settings.discribtion')}
		</div>
		<div class="tabs tabs-boxed items-center">
			{#each locales as l}
				<button
					class="tab flex-1"
					class:tab-active={$locale === l}
					value={l}
					on:click={() => ($locale = l)}>{$t(l)}
                </button>
			{/each}
		</div>
		<div class="dropdown w-full flex-1">
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">{$t('settings.toggel_themes')}</span>
					<input type="checkbox" class="toggle toggle-primary" bind:checked={toggle_theme} />
				</label>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">Enable time travel</span>
					<input type="checkbox" class="toggle toggle-secondary" />
				</label>
			</div>
		</div>
	</div>
</main>
