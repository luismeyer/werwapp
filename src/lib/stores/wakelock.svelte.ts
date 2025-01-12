import { cookies } from '$lib/cookies';
import { requestWakeLock, wakelockAvailable } from '$lib/wakelock';

export type WakeLockState = {
	supported: boolean;
	enabled: boolean;
	wakeLockSentinel?: WakeLockSentinel;
};

export const WAKELOCK_KEY = 'wakelock';

export const wakeLockState = $state<WakeLockState>({
	enabled: false,
	supported: wakelockAvailable()
});

type SerializedWakeLockState = Omit<WakeLockState, 'wakeLockSentinel'>;

function serializeWakelockState() {
	const serialized: SerializedWakeLockState = {
		enabled: wakeLockState.enabled,
		supported: wakeLockState.supported
	};

	cookies.set(WAKELOCK_KEY, JSON.stringify(serialized));
}

export async function deserializeWakelockState(raw: string) {
	const serialized: SerializedWakeLockState = JSON.parse(raw);

	wakeLockState.enabled = serialized.enabled;
	wakeLockState.supported = serialized.supported;

	if (serialized.enabled) {
		wakeLockState.wakeLockSentinel = await requestWakeLock();
	}
}

$effect.root(() => {
	$effect(() => {
		serializeWakelockState();
	});
});
