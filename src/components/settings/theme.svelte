<script lang="ts">
	import { t } from '$lib/stores/translations.svelte';
	import { type Theme, themeState } from '$lib/stores/theme.svelte';
	import { DarkThemes, LightThemes, Themes } from '../../const/themes';

	const themeNameInUpper = (name: string) => name[0]?.toUpperCase() + name.slice(1);
</script>

<label class="flex justify-between items-center mb-2 cursor-pointer">
	<span class="label-text">{t('settings.theme.toggle')}</span>
	<input
		checked={themeState.autoSwitching}
		type="checkbox"
		class="toggle toggle-primary"
		onchange={(e) => (themeState.autoSwitching = e.currentTarget.checked)}
	/>
</label>

<label class="grid grid-cols-3 gap-4 mb-2">
	{#if themeState.autoSwitching}
		<div class="flex flex-col gap-1">
			<span class="label-text">{t('settings.nighttheme')}</span>
			<select
				bind:value={themeState.darkTheme}
				class="select select-primary"
				onchange={(e) => (themeState.darkTheme = e.currentTarget.value as Theme)}
			>
				{#each DarkThemes as theme}
					<option selected={themeState.darkTheme === theme} value={theme}>
						{themeNameInUpper(theme)}
					</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col gap-1">
			<span class="label-text">{t('settings.daytheme')}</span>
			<select
				bind:value={themeState.lightTheme}
				class="select select-primary"
				onchange={(e) => (themeState.lightTheme = e.currentTarget.value as Theme)}
			>
				{#each LightThemes as theme}
					<option selected={themeState.lightTheme === theme} value={theme}>
						{themeNameInUpper(theme)}
					</option>
				{/each}
			</select>
		</div>
	{:else}
		<div class="flex flex-col gap-1">
			<span class="label-text">{t('settings.theme')}</span>
			<select
				bind:value={themeState.darkTheme}
				class="select select-primary"
				onchange={(e) => (themeState.darkTheme = e.currentTarget.value as Theme)}
			>
				{#each Themes as theme}
					<option selected={themeState.darkTheme === theme} value={theme}>
						{themeNameInUpper(theme)}
					</option>
				{/each}
			</select>
		</div>
	{/if}
</label>
