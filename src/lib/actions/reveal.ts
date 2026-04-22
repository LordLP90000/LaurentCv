/**
 * Reveal-on-scroll action.
 *
 * - Marks the host node and any descendant `[data-reveal]` element with the
 *   `.reveal` class, then toggles `.is-visible` once the element enters view.
 * - Children of any `[data-reveal-group]` are auto-staggered via a
 *   `--reveal-delay` custom property so cards in a grid cascade in.
 * - Falls back to immediate visibility when IntersectionObserver is missing.
 */
export function reveal(node: HTMLElement) {
	const groups = [
		...(node.hasAttribute('data-reveal-group') ? [node] : []),
		...Array.from(node.querySelectorAll<HTMLElement>('[data-reveal-group]'))
	];
	for (const group of groups) {
		const step = Number(group.dataset.revealStep ?? '70');
		const max = Number(group.dataset.revealMax ?? '420');
		const children = Array.from(group.children) as HTMLElement[];
		children.forEach((child, i) => {
			child.setAttribute('data-reveal', '');
			child.style.setProperty('--reveal-delay', `${Math.min(i * step, max)}ms`);
		});
	}

	const targets: HTMLElement[] = [
		node,
		...Array.from(node.querySelectorAll<HTMLElement>('[data-reveal]'))
	];
	targets.forEach((el) => el.classList.add('reveal'));

	if (typeof IntersectionObserver === 'undefined') {
		targets.forEach((el) => el.classList.add('is-visible'));
		return;
	}

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
