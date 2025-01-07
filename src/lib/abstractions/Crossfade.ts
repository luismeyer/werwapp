import type { AudioPlayer } from './AudioPlayer.svelte';

const FADE_STEPS = 0.01;
const FADE_INTERVAL = 60;

export const FADE_DURATION = (1 / FADE_STEPS) * FADE_INTERVAL;

export class Crossfade {
	constructor(
		private playerA: AudioPlayer,
		private playerB: AudioPlayer
	) {}

	private get iOS() {
		const touch = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
		const agent = /iPad|iPhone|iPod/.test(navigator.userAgent);

		return touch || agent;
	}

	private round(num: number) {
		return Number(num.toFixed(2));
	}

	private quiter() {
		this.playerA.volume = this.round(this.playerA.volume - FADE_STEPS);
	}

	private louder() {
		this.playerB.volume = this.round(this.playerB.volume + FADE_STEPS);
	}

	public async run() {
		this.playerA.volume = 1;
		this.playerB.volume = 0;

		await this.playerB.play();

		// shortcut the crossfade because volume changes are not supported on iOS
		if (this.iOS) {
			this.playerA.mute();
			this.playerA.volume = 0;

			this.playerB.unmute();
			this.playerB.volume = 1;

			return new Promise((resolve) => setTimeout(resolve, FADE_DURATION));
		}

		return new Promise((resolve) => {
			const interval = setInterval(() => {
				if (this.playerA.volume === 0 && this.playerB.volume === 1) {
					this.playerA.stop();

					clearInterval(interval);
					resolve(undefined);

					return;
				}

				this.louder();
				this.quiter();
			}, FADE_INTERVAL);
		});
	}
}
