<script lang="ts">
	import { t } from '$lib/stores/translations';
	import { wakeLockStore } from '$lib/stores/wakelock';
	import { releaseWakeLock, requestWakeLock, wakelockAvailable } from '$lib/wakelock';

	const handleChange = async () => {
		if ($wakeLockStore.state === 'enabled') {
			await releaseWakeLock($wakeLockStore.wakeLockSentinel);
			wakeLockStore.update({ state: 'disabled' });
			return;
		}

		const wakeLockSentinel = await requestWakeLock();
		if (!wakeLockSentinel) {
			wakeLockStore.update({ state: 'disabled' });
			return;
		}

		wakeLockStore.update({ state: 'enabled', wakeLockSentinel });
	};
</script>

<label class="flex justify-between items-center mb-2 cursor-pointer">
	<span class="label-text">{$t('settings.wakelock')}</span>
	<input
		disabled={!wakelockAvailable()}
		checked={$wakeLockStore.state === 'enabled'}
		type="checkbox"
		class="toggle toggle-primary"
		on:change={handleChange}
	/>
</label>
