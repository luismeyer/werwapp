import { browser } from '$app/environment';
import { wakeLockState } from './stores/wakelock.svelte';

export const wakelockAvailable = () => {
	if (!browser) {
		return false;
	}

	try {
		return 'wakeLock' in navigator;
	} catch {
		return false;
	}
};

export const requestWakeLock = async () => {
	if (!wakelockAvailable()) {
		return;
	}

	try {
		return navigator.wakeLock.request('screen');
	} catch (err) {
		console.info(`Wakelock error: ${err}`);
	}
};

export const releaseWakeLock = (wakeLockSentinal: WakeLockSentinel) => {
	return wakeLockSentinal.release();
};

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
