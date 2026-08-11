<script lang="ts">
	import { resolve } from '$app/paths';
	import type { NavItem } from '$data/navigation';

	export interface RelatedLink {
		route: NavItem['route'];
		label: string;
		description: string;
	}

	interface Props {
		links: RelatedLink[];
	}

	let { links }: Props = $props();
</script>

<aside class="mx-auto w-full max-w-6xl px-4 pb-8 md:px-6" aria-label="Verwandte Seiten">
	<h2 class="mb-4 text-sm font-semibold tracking-wider uppercase" style:color="var(--text-muted)">
		Weiter entdecken
	</h2>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each links as link (link.route)}
			<a
				href={resolve(link.route)}
				class="tilt-card group flex flex-col gap-1 rounded-xl border p-4"
				style:border-color="var(--border)"
				style:background="var(--surface-muted)"
			>
				<span class="font-medium transition-colors group-hover:text-[var(--accent)]">
					{link.label} →
				</span>
				<span class="text-sm leading-relaxed" style:color="var(--text-muted)">
					{link.description}
				</span>
			</a>
		{/each}
	</div>
</aside>
