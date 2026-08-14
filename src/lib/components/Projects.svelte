<script lang="ts">
	import Section from './Section.svelte';
	import { projects, type Project } from '$data/projects';

	const statusLabel: Record<Project['status'], string> = {
		'in-progress': 'IN ARBEIT',
		live: 'LIVE',
		archived: 'ARCHIVIERT',
		concept: 'KONZEPT'
	};
</script>

<Section
	id="a-projekte"
	num="04"
	title="Projekte"
	lead="Kein poliertes Portfolio-Grid, sondern die Werkbank: Dinge, an denen ich gerade arbeite."
>
	<div class="flex flex-col" data-reveal-group data-reveal-step="90">
		{#each projects as p (p.id)}
			<article
				class="grid gap-4 border-b border-line py-9 min-[900px]:grid-cols-[200px_1fr] min-[900px]:gap-8"
			>
				<div>
					<p class="font-mono text-[13px]">{p.year}</p>
					<p class="mt-1.5 font-mono text-xs text-copper">{statusLabel[p.status]}</p>
				</div>
				<div>
					<h3 class="text-[26px] leading-tight font-semibold tracking-[-0.015em]">{p.title}</h3>
					<p class="mt-3.5 max-w-[560px] text-[15px] leading-[1.7] text-muted">{p.description}</p>
					<p class="mt-4 font-mono text-xs tracking-[0.04em] text-muted">
						{p.stack.join(' · ').toUpperCase()}
					</p>
					<p class="mt-3.5 flex flex-wrap gap-x-6 gap-y-2">
						{#each p.links as link (link.href)}
							<a
								href={link.href}
								target="_blank"
								rel="noreferrer"
								class="border-b border-copper pb-px text-sm font-medium text-copper"
							>
								{link.label} ansehen →
							</a>
						{/each}
					</p>
				</div>
			</article>
		{/each}
	</div>
</Section>
