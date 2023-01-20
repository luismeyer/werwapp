export const wakelockAvailable = () => 'wakeLock' in navigator;

export const requestWakeLock = async () => {
	if (!wakelockAvailable()) {
		console.info('Wakelock Api not available in this Browser');
		return;
	}

	try {
		console.info('Requesting wakelock');
		return await navigator.wakeLock.request('screen');
	} catch (err) {
		console.info(`Wakelock error: ${err}`);
	}
};

export const releaseWakeLock = (wakeLockSentinal: WakeLockSentinel) => {
	return wakeLockSentinal.release();
};
