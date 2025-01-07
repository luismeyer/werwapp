import { browser } from '$app/environment';
import * as cookie from 'cookie';

export function cookies() {
	if (!browser) {
		return new Map();
	}

	return new Map(Object.entries(cookie.parse(document.cookie)));
}
