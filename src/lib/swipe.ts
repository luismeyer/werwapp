type SwipeOptions = {
	handleLeft: () => void;
	handleRight: () => void;
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

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		/*most significant*/
		if (xDiff > 0) {
			options.handleRight();
		} else {
			options.handleLeft();
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
