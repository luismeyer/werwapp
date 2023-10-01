export const transition = (animate: () => void) => {
	return () => {
		if ('startViewTransition' in document) {
			document.startViewTransition(animate);

			return;
		}

		animate();
	};
};
