import { browser } from '$app/environment';

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
		console.info('Wakelock Api not available in this Browser');
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
