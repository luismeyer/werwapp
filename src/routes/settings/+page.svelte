<script lang="ts">
	import { wakeLockState } from '$lib/stores/wakelock.svelte';
	import SettingsI18n from '../../components/settings/i18n.svelte';
	import SettingsItems from '../../components/settings/items.svelte';
	import SettingsTheme from '../../components/settings/theme.svelte';
	import SettingsWakelock from '../../components/settings/wakelock.svelte';
</script>

<div class="px-5 pb-20 h-full flex flex-col">
	<SettingsI18n />

	<div class="divider"></div>

	<SettingsItems />

	<div class="divider"></div>

	<SettingsTheme />

	<div class="divider"></div>

	{#if wakeLockState.supported}
		<SettingsWakelock />
	{/if}
</div>
