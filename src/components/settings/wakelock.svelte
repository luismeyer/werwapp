<script lang="ts">
	import { t } from '$lib/stores/translations.svelte';
	import { disableWakelock, enableWakelock, wakeLockState } from '$lib/stores/wakelock.svelte';
	import { wakelockAvailable } from '$lib/wakelock';

	const handleChange = async () => {
		if (wakeLockState.enabled) {
			await disableWakelock();
		} else {
			await enableWakelock();
		}
	};
</script>

<label class="flex justify-between items-center mb-2 cursor-pointer">
	<span class="label-text">{t('settings.wakelock')}</span>
	<input
		disabled={!wakelockAvailable()}
		checked={wakeLockState.enabled}
		type="checkbox"
		class="toggle toggle-primary"
		onchange={handleChange}
	/>
</label>
