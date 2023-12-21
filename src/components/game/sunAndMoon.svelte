<script lang="ts">
	import { gameStore } from '$lib/stores/game';
	import { isFading, nextPlayer } from '$lib/stores/player';

	$: ({ ready } = $nextPlayer);

	$: disabled = !$ready || $isFading;

	$: disabledClass = disabled ? 'disabled' : '';

	let moonClass = 'out-top';
	let sunClass = 'in-bottom';

	// disable the transition after animation so the
	// in- and out- class switch will not get animated
	$: transitionClass = $isFading ? 'transition' : '';

	// the class if running is always the target position of
	// the animation. the class if not running is the starting
	// position of the next animation
	$: enterScreenClass = $isFading ? 'in-top' : 'out-top';
	$: leaveScreenClass = $isFading ? 'out-bottom' : 'in-bottom';

	$: sunClass = $gameStore.phase === 'day' ? enterScreenClass : leaveScreenClass;
	$: moonClass = $gameStore.phase === 'night' ? enterScreenClass : leaveScreenClass;
</script>

<div class="w-full h-full relative">
	<button on:click {disabled}>
		<svg
			class={`icon ${disabledClass} ${moonClass} ${transitionClass}`}
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

	<button on:click {disabled}>
		<svg
			class={`icon ${disabledClass} ${sunClass} ${transitionClass}`}
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
</div>

<style>
	.icon {
		position: absolute;
		top: calc(100dvh / 2 + 25%);
		margin: auto;
		left: 0;
		right: 0;
		fill: hsl(var(--p));
	}

	.transition {
		/* transform time = FadeDuration */
		transition: opacity 1s ease, fill 6s ease, transform 6s ease;
	}

	/* start position on the top before the icon leaves the screen */
	.out-top {
		transform: rotate(0deg) translate(0px, calc(-100dvh / 2)) rotate(0deg);
	}

	/* end position on the bottom after the icon left the screen */
	.out-bottom {
		transform: rotate(180deg) translate(0px, calc(-100dvh / 2)) rotate(-180deg);
	}

	/* end position on the top after the icon entered the screen */
	.in-top {
		transform: rotate(180deg) translate(0px, calc(100dvh / 2)) rotate(-180deg);
	}

	/* start position on the bottom before the icon enters the screen */
	.in-bottom {
		transform: rotate(0deg) translate(0px, calc(100dvh / 2)) rotate(0deg);
	}

	.disabled {
		opacity: 0.5;
	}

	@keyframes cirlceIn {
		0% {
			transform: rotate(0deg) translate(0px, calc(100dvh / 2)) rotate(0deg);
		}
		100% {
			transform: rotate(180deg) translate(0px, calc(100dvh / 2)) rotate(-180deg);
		}
	}

	@keyframes circleOut {
		0% {
			transform: rotate(0deg) translate(0px, calc(-100dvh / 2)) rotate(0deg);
		}
		100% {
			transform: rotate(180deg) translate(0px, calc(-100dvh / 2)) rotate(-180deg);
		}
	}

	.sun {
		animation: sun 12s linear infinite;
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
			transform: rotate(-10deg);
		}

		60% {
			transform: rotate(20deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}
</style>
