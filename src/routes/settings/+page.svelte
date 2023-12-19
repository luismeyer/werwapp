<script lang="ts">
	import { t } from '$lib/stores/translations';
	import { wakelockAvailable } from '$lib/wakelock';

	import SettingsI18n from '../../components/settings/i18n.svelte';
	import SettingsItems from '../../components/settings/items.svelte';
	import SettingsTheme from '../../components/settings/theme.svelte';
	import SettingsWakelock from '../../components/settings/wakelock.svelte';
</script>

<div class="px-5 pb-20 h-full flex flex-col">
	<div class="text-xl font-extrabold">{$t('settings')}</div>

	<div class="text-base-content/70 my-4 text-xs">
		{$t('settings.discribtion')}
	</div>

	<div class="divider" />

	<SettingsI18n />

	<div class="divider" />

	<SettingsItems />

	<div class="divider" />

	<SettingsTheme />

	<div class="divider" />

	{#if wakelockAvailable()}
		<SettingsWakelock />
	{/if}
</div>
