import { browser } from '$app/environment';

type SwipeOptions = {
	handleLeft?: () => void;
	handleRight?: () => void;
	handleUp?: () => void;
	handleDown?: () => void;
};

let xDown: number | null = null;
let yDown: number | null = null;

const handleTouchStart = (evt: TouchEvent) => {
	const [firstTouch] = evt.touches;
	xDown = firstTouch?.clientX ?? 0;
	yDown = firstTouch?.clientY ?? 0;
};

const handleTouchMove = (options: SwipeOptions) => (evt: TouchEvent) => {
	if (!xDown || !yDown) {
		return;
	}

	const xUp = evt.touches[0]?.clientX ?? 0;
	const yUp = evt.touches[0]?.clientY ?? 0;

	const xDiff = xDown - xUp;
	const yDiff = yDown - yUp;

	const threshhold = 5;

	if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > threshhold) {
		if (xDiff > 0) {
			options.handleLeft?.();
		} else {
			options.handleRight?.();
		}
	}

	if (Math.abs(yDiff) > Math.abs(xDiff) && Math.abs(yDiff) > threshhold) {
		if (yDiff > 0) {
			options.handleDown?.();
		} else {
			options.handleUp?.();
		}
	}

	/* reset values */
	xDown = null;
	yDown = null;
};

export const registerSwipeGestures = (options: SwipeOptions) => {
	if (!browser) {
		return;
	}

	document.addEventListener('touchstart', handleTouchStart, false);
	document.addEventListener('touchmove', handleTouchMove(options), false);
};
