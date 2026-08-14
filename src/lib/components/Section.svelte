<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		num: string;
		title: string;
		lead?: string;
		first?: boolean;
		children: Snippet;
	}

	let { id, num, title, lead, first = false, children }: Props = $props();
</script>

<section
	{id}
	data-reveal
	class={first
		? 'pt-10 min-[900px]:pt-22'
		: 'mt-24 border-t border-line-strong pt-8 min-[900px]:mt-30'}
>
	<h2 class="mb-5 font-mono text-xs tracking-[0.12em] text-copper">
		{num} — {title.toUpperCase()}
	</h2>
	{#if lead}
		<p class="mb-10 max-w-[600px] text-[15px] leading-[1.65] text-muted">{lead}</p>
	{/if}
	{@render children()}
</section>
