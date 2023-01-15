<script lang="ts">
	import { t } from '$lib/stores/i18n';

	import SettingsI18n from './settings-i18n.svelte';
	import SettingsItems from './settings-items.svelte';
	import SettingsTheme from './settings-theme.svelte';
</script>

<div class="px-5 pb-20">
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
</div>
