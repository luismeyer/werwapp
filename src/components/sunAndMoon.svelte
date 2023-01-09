<script lang="ts">
	import { FadeDuration } from '$lib/songs/song';

	export let disabled: boolean;
	export let handleStateChange: () => void;

	let running: boolean;

	let current: 'sun' | 'moon' = 'moon';

	$: animationStateClass = running ? 'running' : 'paused';

	$: moonAnimationClass = current === 'moon' ? 'out-animation' : 'in-animation';
	$: sunAnimationClass = current === 'sun' ? 'out-animation' : 'in-animation';

	const handleClick = () => {
		handleStateChange();

		running = true;

		setTimeout(() => {
			running = false;

			current = current === 'moon' ? 'sun' : 'moon';
		}, FadeDuration);
	};
</script>

<button on:click={handleClick} {disabled}>
	<svg
		class={`${moonAnimationClass} ${animationStateClass} circle`}
		xmlns="http://www.w3.org/2000/svg"
		width="192"
		height="192"
		viewBox="0 0 24 24"
	>
		<path
			class="moon"
			d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"
		/>
	</svg>
</button>

<button on:click={handleClick} {disabled}>
	<svg
		class={`${sunAnimationClass} ${animationStateClass} circle`}
		xmlns="http://www.w3.org/2000/svg"
		width="192"
		height="192"
		viewBox="0 0 24 24"
	>
		<path
			class="sun"
			d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"
		/>
	</svg>
</button>

<style>
	.circle {
		position: absolute;
		top: 700px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		margin: auto;
	}

	.in-animation {
		transform: translate(0px, 400px);
		animation: cirlceIn 6s ease infinite;
	}

	.out-animation {
		transform: translate(0px, -400px);
		animation: circleOut 6s ease infinite;
	}

	.running {
		animation-play-state: running;
	}

	.paused {
		animation-play-state: paused;
	}

	@keyframes cirlceIn {
		0% {
			transform: rotate(0deg) translate(0px, 400px) rotate(0deg);
		}
		100% {
			transform: rotate(180deg) translate(0px, 400px) rotate(-180deg);
		}
	}

	@keyframes circleOut {
		0% {
			transform: rotate(0deg) translate(0px, -400px) rotate(0deg);
		}
		100% {
			transform: rotate(180deg) translate(0px, -400px) rotate(-180deg);
		}
	}

	.sun {
		animation: selfRotating 12s linear infinite;
		transform-origin: 50% 50%;
	}

	@keyframes sun {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.moon {
		animation: moon 6s ease infinite;
		transform-origin: 50% 50%;
	}

	@keyframes moon {
		0% {
			transform: rotate(0deg);
		}

		30% {
			transform: rotate(20deg);
		}

		60% {
			transform: rotate(-10deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}
</style>
