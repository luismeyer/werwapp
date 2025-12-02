import { build, files, version } from "$service-worker";

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files, // everything in `static`
];

self.addEventListener("install", (e: Event) => {
	const event = e as unknown as { waitUntil: (promise: Promise<void>) => void };

	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener("activate", (e: Event) => {
	const event = e as unknown as { waitUntil: (promise: Promise<void>) => void };

	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", (e: Event) => {
	const event = e as unknown as {
		request: Request;
		respondWith: (response: Promise<Response | undefined>) => void;
	};

	// ignore POST requests etc
	if (event.request.method !== "GET") return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		// `build`/`files` can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			return cache.match(event.request);
		}

		// cache songs
		if (url.pathname.startsWith("storage-freemusicarchive-org")) {
			const cachedSong = await cache.match(event.request);
			if (cachedSong) {
				return cachedSong;
			}
		}

		// cache avatar images
		if (url.host.includes("utfs.io")) {
			const cachedImage = await cache.match(event.request);

			if (cachedImage) {
				return cachedImage;
			}
		}

		try {
			const response = await fetch(event.request);

			if (response.status <= 200) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch {
			return cache.match(event.request);
		}
	}

	event.respondWith(respond());
});
