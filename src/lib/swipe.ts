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
	xDown = firstTouch.clientX;
	yDown = firstTouch.clientY;
};

const handleTouchMove = (options: SwipeOptions) => (evt: TouchEvent) => {
	if (!xDown || !yDown) {
		return;
	}

	const xUp = evt.touches[0].clientX;
	const yUp = evt.touches[0].clientY;

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
	document.addEventListener('touchstart', handleTouchStart, false);
	document.addEventListener('touchmove', handleTouchMove(options), false);
};
