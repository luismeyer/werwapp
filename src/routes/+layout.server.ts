import { isLocale, LOCALE_KEY } from '$lib/stores/i18n.svelte';
import { WAKELOCK_KEY, type WakeLockState } from '$lib/stores/wakelock.svelte';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const locale = cookies.get(LOCALE_KEY);
	const wakelock = cookies.get(WAKELOCK_KEY);

	return {
		locale: isLocale(locale) ? locale : 'de',
		wakelock: wakelock ? (JSON.parse(wakelock) as WakeLockState) : undefined
	};
};
