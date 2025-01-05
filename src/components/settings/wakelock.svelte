<script lang="ts">
	import { t } from '$lib/stores/translations.svelte';
	import { mountWakeLock, wakeLockStore } from '$lib/stores/wakelock';
	import { wakelockAvailable } from '$lib/wakelock';
	import { onMount } from 'svelte';

	onMount(() => {
		// wakelock can only be mounted after user interaction
		mountWakeLock();
	});

	const handleChange = async () => {
		if ($wakeLockStore.state === 'enabled') {
			wakeLockStore.disable();
		}

		if ($wakeLockStore.state === 'disabled') {
			wakeLockStore.enable();
		}
	};
</script>

<label class="flex justify-between items-center mb-2 cursor-pointer">
	<span class="label-text">{t('settings.wakelock')}</span>
	<input
		disabled={!wakelockAvailable()}
		checked={$wakeLockStore.state === 'enabled'}
		type="checkbox"
		class="toggle toggle-primary"
		onchange={handleChange}
	/>
</label>
