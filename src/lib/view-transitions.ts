export const transition = (animate: () => void) => {
	return () => {
		if (document.startViewTransition) {
			const viewTransition = document.startViewTransition(animate);
			return viewTransition;
		}

		animate();
	};
};

export const slideTransition = (animate: () => void, direction: 'left' | 'right') => {
	const transitionFunction = transition(animate);

	return () => {
		const viewTransition = transitionFunction();

		if (!viewTransition) {
			return;
		}

		viewTransition.ready.then(() => {
			const leftSlide = direction === 'left';

			const options = { duration: 500, easing: 'ease' };

			document.documentElement.animate(
				{
					transform: [`translateX(${leftSlide ? '' : '-'}100%)`, 'translateX(0%)'],
					opacity: [0, 1]
				},
				{ ...options, pseudoElement: '::view-transition-new(slide)' }
			);

			document.documentElement.animate(
				{
					transform: ['translateX(0%)', `translateX(${leftSlide ? '-' : ''}100%)`],
					opacity: [1, 0]
				},
				{ ...options, pseudoElement: '::view-transition-old(slide)' }
			);
		});
	};
};
