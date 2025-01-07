import { browser } from '$app/environment';
import { cookies } from '$lib/cookies';
import { releaseWakeLock, requestWakeLock, wakelockAvailable } from '$lib/wakelock';

export type WakeLockState = {
	supported: boolean;
	enabled: boolean;
	wakeLockSentinel?: WakeLockSentinel;
};

export const WAKELOCK_KEY = 'wakelock';

const init = async (): Promise<void> => {
	if (!browser) {
		return;
	}

	const custom = cookies.get(WAKELOCK_KEY);
	const state: WakeLockState | undefined = JSON.parse(custom ?? '');

	if (state) {
		wakeLockState.enabled = state.enabled;
		wakeLockState.supported = state.supported;

		if (state.enabled) {
			wakeLockState.wakeLockSentinel = await requestWakeLock();
		}
	}
};

export const wakeLockState = $state<WakeLockState>({
	enabled: false,
	supported: wakelockAvailable()
});

void init();

$effect.root(() => {
	$effect(() => {
		cookies.set(WAKELOCK_KEY, JSON.stringify(wakeLockState));
	});
});

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
