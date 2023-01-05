<script lang="ts">
	import { t, locale, locales } from '../lib/translation/i18n';
	import { themes, themeStore } from '../lib/stores/theme';
</script>

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
			on:click={() => ($locale = l)}
			>{$t(l)}
		</button>
	{/each}
</div>

<div class="dropdown w-full flex-1">
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">{$t('settings.toggel_themes')}</span>
			<input
				checked={true}
				type="checkbox"
				class="toggle toggle-primary"
				on:change={(e) => themeStore.setAutoSwitching(e.target?.checked)}
			/>
		</label>
	</div>

	<p>Theme</p>
	<select
		value={$themeStore.lightTheme}
		class="tabs tabs-boxed items-center"
		on:change={(e) => themeStore.setLightTheme(e.target?.value)}
	>
		{#each themes as theme}
			<option value={theme}>
				{theme}
			</option>
		{/each}
	</select>

	{#if $themeStore.autoSwitching}
		<p>Night Theme</p>
		<select
			value={$themeStore.darkTheme}
			class="tabs tabs-boxed items-center"
			on:change={(e) => themeStore.setDarkTheme(e.target?.value)}
		>
			{#each themes as theme}
				<option value={theme}>
					{theme}
				</option>
			{/each}
		</select>
	{/if}

	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Enable time travel</span>
			<input type="checkbox" class="toggle toggle-secondary" />
		</label>
	</div>
</div>
