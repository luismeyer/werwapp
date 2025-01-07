import { browser } from '$app/environment';
import { releaseWakeLock, requestWakeLock } from '$lib/wakelock';

type WakeLockStore = {
	enabled: boolean;
	wakeLockSentinel?: WakeLockSentinel;
};

const WAKELOCK_STORAGE_KEY = 'wakelock';

const initState = async () => {
	if (!browser) {
		return;
	}

	const enabled: boolean | undefined = JSON.parse(localStorage.getItem(WAKELOCK_STORAGE_KEY) ?? '');

	if (enabled) {
		const wakeLockSentinel = await requestWakeLock();
		wakeLockState.enabled = true;
		wakeLockState.wakeLockSentinel = wakeLockSentinel;
	} else {
		wakeLockState.enabled = false;
	}
};

export const wakeLockState = $state<WakeLockStore>({
	enabled: false
});

$effect.root(() => {
	$effect(() => {
		localStorage.setItem(WAKELOCK_STORAGE_KEY, JSON.stringify(wakeLockState.enabled));
	});
});

void initState();

export const enableWakelock = async () => {
	if (wakeLockState.enabled) {
		return;
	}

	const wakeLockSentinel = await requestWakeLock();
	if (!wakeLockSentinel) {
		return { state: 'disabled' };
	}

	wakeLockState.enabled = true;
	wakeLockState.wakeLockSentinel = wakeLockSentinel;
};

export const disableWakelock = async () => {
	if (!wakeLockState.enabled || !wakeLockState.wakeLockSentinel) {
		return;
	}

	await releaseWakeLock(wakeLockState.wakeLockSentinel);

	wakeLockState.enabled = false;
};
