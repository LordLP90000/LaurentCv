<script lang="ts">
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import { reveal } from '$lib/actions/reveal';
	import './layout.css';

	let { children } = $props();

	// Track pointer position relative to .tilt-card hovered, so the radial
	// glow defined in layout.css follows the cursor for a tactile feel.
	function trackCardGlow(event: PointerEvent) {
		const card = (event.target as HTMLElement | null)?.closest<HTMLElement>('.tilt-card');
		if (!card) return;
		const rect = card.getBoundingClientRect();
		card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
		card.style.setProperty('--my', `${event.clientY - rect.top}px`);
	}

	// Fallback scroll progress for browsers without animation-timeline.
	let progress = $state(0);
	function onScroll() {
		const doc = document.documentElement;
		const max = doc.scrollHeight - doc.clientHeight;
		progress = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
	}

	$effect(() => {
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});

	const supportsScrollTimeline =
		typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: scroll()');
</script>

<div
	class="scroll-progress"
	style:transform={supportsScrollTimeline ? undefined : `scaleX(${progress})`}
	aria-hidden="true"
></div>

<Header />
<main use:reveal onpointermove={trackCardGlow} class="flex min-h-screen flex-col">
	{@render children()}
</main>
<Footer />
