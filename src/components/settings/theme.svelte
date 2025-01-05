<script lang="ts">
	import { t } from '$lib/stores/translations';
	import { themes, themeState } from '$lib/stores/theme.svelte';

	const themeNameInUpper = (name: string) => name[0]?.toUpperCase() + name.slice(1);
</script>

<label class="flex justify-between items-center mb-2 cursor-pointer">
	<span class="label-text">{$t('settings.theme.toggle')}</span>
	<input
		checked={themeState.autoSwitching}
		type="checkbox"
		class="toggle toggle-primary"
		onchange={(e) => (themeState.autoSwitching = e.currentTarget.checked)}
	/>
</label>

<label class="grid grid-cols-3 gap-4 mb-2">
	<div class="flex flex-col gap-1">
		<span class="label-text">{$t('settings.nighttheme')}</span>
		<select
			value={themeState.darkTheme}
			class="select select-primary"
			onchange={(e) => (themeState.darkTheme = e.currentTarget.value)}
		>
			{#each themes as theme}
				<option value={theme}>
					{themeNameInUpper(theme)}
				</option>
			{/each}
		</select>
	</div>

	{#if themeState.autoSwitching}
		<div class="flex flex-col gap-1">
			<span class="label-text">{$t('settings.daytheme')}</span>
			<select
				value={themeState.lightTheme}
				class="select select-primary"
				onchange={(e) => (themeState.lightTheme = e.currentTarget.value)}
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
