<script lang="ts">
	import { i18nStore, t } from '$lib/stores/i18n';
	import { themes, themeStore } from '$lib/stores/theme';
	import { locales } from '$lib/translations/translations';

	import Support from './support.svelte';

	const themeNameInUpper = (name: string) => name[0].toUpperCase() + name.slice(1);
</script>

<div class="text-xl font-extrabold">{$t('settings')}</div>
<div class="text-base-content/70 my-4 text-xs">
	{$t('settings.discribtion')}
</div>

<div class="tabs tabs-boxed items-center mb-1">
	{#each locales as l}
		<button
			class="tab flex-1"
			class:tab-active={$i18nStore === l}
			value={l}
			on:click={() => i18nStore.updateLocale(l)}
		>
			{$t(l)}
		</button>
	{/each}
</div>

<label for="qa-modal" class="label cursor-pointer">
	<span class="label-text">{$t('settings.qa')}</span>
	<label for="qa-modal" class="btn btn-sm">{$t('settings.support')}</label>
</label>

<input type="checkbox" id="qa-modal" class="modal-toggle" />
<label for="qa-modal" class="modal cursor-pointer ">
	<label class="modal-box relative" for="">
		<label for="qa-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<Support />
	</label>
</label>

<label class="label cursor-pointer">
	<span class="label-text">{$t('settings.theme.toggle')}</span>
	<input
		checked={$themeStore.autoSwitching}
		type="checkbox"
		class="toggle toggle-primary"
		on:change={(e) => themeStore.setAutoSwitching(e.currentTarget.checked)}
	/>
</label>

<label class="label grid grid-cols-3 gap-4">
	<div class="flex flex-col gap-1">
		<span class="label-text">{$t('settings.nighttheme')}</span>
		<select
			value={$themeStore.darkTheme}
			class="tabs tabs-boxed items-center cursor-pointer"
			on:change={(e) => themeStore.setDarkTheme(e.currentTarget.value)}
		>
			{#each themes as theme}
				<option value={theme}>
					{themeNameInUpper(theme)}
				</option>
			{/each}
		</select>
	</div>

	{#if $themeStore.autoSwitching}
		<div class="flex flex-col gap-1">
			<span class="label-text">{$t('settings.daytheme')}</span>
			<select
				value={$themeStore.lightTheme}
				class="tabs tabs-boxed items-center cursor-pointer"
				on:change={(e) => themeStore.setLightTheme(e.currentTarget.value)}
			>
				{#each themes as theme}
					<option value={theme}>
						{themeNameInUpper(theme)}
					</option>
				{/each}
			</select>
		</div>
	{/if}
</label>

<style>
	.modal-box {
		height: 30rem;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
</style>
