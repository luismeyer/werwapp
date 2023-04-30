import { readable, writable, type Readable } from 'svelte/store';
import { createApiSongUrl, type Song } from '../song';
import type { SongRepository } from './SongRepository';
import { showSongToast } from '../stores/toast';

export class AudioPlayer {
	private audio: HTMLAudioElement;
	private song?: Song;
	public readonly ready = writable(false);

	private nextAudio: HTMLAudioElement;
	private nextSong?: Song;
	public readonly nextReady = writable(false);

	constructor(private songRepository: SongRepository) {
		this.audio = new Audio();
		this.nextAudio = new Audio();

		this.audio.autoplay = false;

		this.progress.subscribe((progress) => {
			if (!this.song || isNaN(this.audio.duration)) {
				return;
			}

			if (progress < this.audio.duration) {
				return;
			}

			this.next();
		});
	}

	private async loadNextSong() {
		const song = this.songRepository.getSong(this.song);

		this.nextReady.set(false);

		this.nextAudio.src = createApiSongUrl(song);
		this.nextAudio.load();

		this.nextAudio.addEventListener('canplay', () => {
			this.nextSong = song;
			this.nextReady.set(true);
		});
	}

	public async loadSong() {
		const song = this.nextSong ?? this.songRepository.getSong(this.song);

		this.ready.set(false);

		this.audio.src = createApiSongUrl(song);
		this.audio.load();

		return new Promise((resolve, reject) => {
			this.audio.addEventListener('canplay', () => {
				this.song = song;
				this.ready.set(true);

				this.loadNextSong();

				resolve(true);
			});

			this.audio.addEventListener('error', (error) => {
				this.ready.set(false);

				reject(error);
			});
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

		this.ready.set(false);
	}

	public async next() {
		this.stop();

		await this.loadSong();

		this.play();
	}

	public get duration(): Readable<number> {
		const defaultDuration = isNaN(this.audio.duration) ? 0 : this.audio.duration;

		return readable(defaultDuration, (set) => {
			const updateDuration = () => {
				set(this.audio.duration);
			};

			this.audio.addEventListener('durationchange', updateDuration);

			return () => {
				this.audio.removeEventListener('durationchange', updateDuration);
			};
		});
	}

	public get progress(): Readable<number> {
		return readable(this.audio.currentTime, (set) => {
			const updateProgress = () => {
				set(this.audio.currentTime);
			};

			this.audio.addEventListener('timeupdate', updateProgress);

			return () => {
				this.audio.removeEventListener('timeupdate', updateProgress);
			};
		});
	}

	public get playing(): Readable<boolean> {
		return readable(!this.audio.paused, (set) => {
			const updatePlaying = () => {
				set(!this.audio.paused);
			};

			this.audio.addEventListener('play', updatePlaying);
			this.audio.addEventListener('pause', updatePlaying);

			return () => {
				this.audio.removeEventListener('play', updatePlaying);
				this.audio.removeEventListener('pause', updatePlaying);
			};
		});
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
