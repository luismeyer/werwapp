import { readable, writable, type Readable } from 'svelte/store';

import { showSongToast } from '../stores/toast';
import type { SongRepository } from './SongRepository';
import type { Song } from '../song';
import { createAudio, type AudioInterface } from './audio';

export class AudioPlayer {
	private audio: AudioInterface;
	private song?: Song;
	public ready = $state(false);

	private nextAudio?: string;
	private nextSong?: Song;
	public nextReady = $state(false);

	public playing = $state(false);
	public duration = $state(0);
	public progress = $state(0);
	constructor(
		private songRepository: SongRepository,
		private displayName: string
	) {
		this.audio = createAudio(songRepository);
		this.audio.autoplay = false;

		$effect.root(() => {
			$effect(() => {
				// play next song ends
				if (this.playing && this.progress >= this.audio.duration) {
					this.next();
				}
			});

			$effect(() => {
				const updatePlaying = () => {
					this.playing = !this.audio.paused;
				};

				this.audio.addEventListener('play', updatePlaying);
				this.audio.addEventListener('pause', updatePlaying);

				return () => {
					this.audio.removeEventListener('play', updatePlaying);
					this.audio.removeEventListener('pause', updatePlaying);
				};
			});

			$effect(() => {
				const updateDuration = () => {
					this.duration = this.audio.duration;
					console.info('durationchange', this.audio.duration);
				};

				this.audio.addEventListener('durationchange', updateDuration);

				return () => {
					this.audio.removeEventListener('durationchange', updateDuration);
				};
			});

			$effect(() => {
				const updateProgress = () => {
					this.progress = this.audio.currentTime;
				};

				this.audio.addEventListener('timeupdate', updateProgress);

				return () => {
					this.audio.removeEventListener('timeupdate', updateProgress);
				};
			});
		});
	}

	private async loadAudio(url: string) {
		return fetch(url)
			.then((res) => res.blob())
			.then((blob) => window.URL.createObjectURL(blob));
	}

	private async loadNextSong() {
		const song = await this.songRepository.getSong();

		this.nextReady = false;

		const src = await this.loadAudio(song.songUrl);

		this.nextAudio = src;
		this.nextSong = song;
		this.nextReady = true;
	}

	public async loadSong() {
		const song = this.nextSong ?? (await this.songRepository.getSong());

		this.ready = false;

		const src = this.nextAudio ?? (await this.loadAudio(song.songUrl));

		this.audio.src = src;
		this.audio.load();

		return new Promise((resolve, reject) => {
			this.audio.oncanplay = () => {
				this.song = song;
				this.ready = true;

				void this.loadNextSong();

				resolve(true);
			};

			this.audio.onerror = (error) => {
				this.ready = false;

				reject(error);
			};
		});
	}

	public async play() {
		if (!this.song) {
			await this.loadSong();
		}

		showSongToast(this.song);
		this.audio.play();
	}

	public resume() {
		this.audio.play();
	}

	public pause() {
		this.audio.pause();
	}

	public stop() {
		this.audio.pause();
		this.audio.currentTime = 0;

		this.ready = false;
	}

	public async next() {
		this.stop();

		await this.loadSong();

		this.play();
	}

	public get volume() {
		return this.audio.volume;
	}

	public set volume(value: number) {
		this.audio.volume = value;
	}

	public mute() {
		this.audio.muted = true;
	}

	public unmute() {
		this.audio.muted = false;
	}

	public get muted() {
		return this.audio.muted;
	}
}
