<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		eyebrow?: string;
		title: string;
		lead?: string;
		children: Snippet;
	}

	let { id, eyebrow, title, lead, children }: Props = $props();
</script>

<section {id} class="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28" data-reveal>
	<header class="mb-10 max-w-2xl">
		{#if eyebrow}
			<p
				class="mb-2 text-xs font-medium tracking-[0.2em] uppercase"
				style:color="var(--accent)"
			>
				{eyebrow}
			</p>
		{/if}
		<h2 class="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
		{#if lead}
			<p class="mt-3 text-base leading-relaxed" style:color="var(--text-muted)">{lead}</p>
		{/if}
	</header>

	{@render children()}
</section>
