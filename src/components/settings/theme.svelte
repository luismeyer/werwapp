<script lang="ts">
	import { t } from '$lib/stores/translations.svelte';
	import { type Theme, themeState } from '$lib/stores/theme.svelte';
	import { DarkThemes, LightThemes } from '../../const/themes';

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
	<div class="flex flex-col gap-1">
		<span class="label-text">{t('settings.nighttheme')}</span>
		<select
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

	{#if themeState.autoSwitching}
		<div class="flex flex-col gap-1">
			<span class="label-text">{t('settings.daytheme')}</span>
			<select
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
	{/if}
</label>
