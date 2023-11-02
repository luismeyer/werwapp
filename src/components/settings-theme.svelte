<script lang="ts">
	import { t } from '$lib/stores/translations';
	import { themes, themeStore } from '$lib/stores/theme';

	const themeNameInUpper = (name: string) => name[0].toUpperCase() + name.slice(1);
</script>

<label class="flex justify-between items-center mb-2 cursor-pointer">
	<span class="label-text">{$t('settings.theme.toggle')}</span>
	<input
		checked={$themeStore.autoSwitching}
		type="checkbox"
		class="toggle toggle-primary"
		on:change={(e) => themeStore.setAutoSwitching(e.currentTarget.checked)}
	/>
</label>

<label class="grid grid-cols-3 gap-4 mb-2">
	<div class="flex flex-col gap-1">
		<span class="label-text">{$t('settings.nighttheme')}</span>
		<select
			value={$themeStore.darkTheme}
			class="select select-primary"
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
				class="select select-primary"
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
