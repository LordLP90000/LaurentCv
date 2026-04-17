export function reveal(node: HTMLElement) {
	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-visible');
		return;
	}

	const targets: HTMLElement[] = [node, ...Array.from(node.querySelectorAll<HTMLElement>('[data-reveal]'))];
	targets.forEach((el) => el.classList.add('reveal'));

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					io.unobserve(entry.target);
				}
			}
		},
		{ rootMargin: '-5% 0px', threshold: 0.05 }
	);

	targets.forEach((el) => io.observe(el));

	return {
		destroy() {
			io.disconnect();
		}
	};
}
