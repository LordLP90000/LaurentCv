<script lang="ts">
	import { projects, type Project } from '$data/projects';
	import Section from './Section.svelte';

	const statusLabel: Record<Project['status'], string> = {
		live: 'Live',
		'in-progress': 'In Arbeit',
		archived: 'Archiv',
		concept: 'Konzept'
	};

	const statusColor: Record<Project['status'], string> = {
		live: 'var(--highlight)',
		'in-progress': 'var(--accent)',
		archived: 'var(--text-muted)',
		concept: '#f5a524'
	};
</script>

<Section
	id="projects"
	eyebrow="Tech Lab"
	title="Projekte — meine Werkstatt."
	lead="Kein poliertes Portfolio-Grid, sondern die Werkbank: Dinge, an denen ich gerade arbeite oder die mich geprägt haben."
>
	<div class="grid gap-5 md:grid-cols-2">
		{#each projects as project (project.id)}
			<article
				class="group flex flex-col gap-4 rounded-2xl border p-5 transition-transform hover:-translate-y-1 sm:p-6"
				style:border-color="var(--border)"
				style:background="var(--surface-muted)"
			>
				<header class="flex items-start justify-between gap-3">
					<div>
						<p class="mb-1 font-mono text-xs tracking-wider uppercase" style:color="var(--text-muted)">
							{project.year}
						</p>
						<h3 class="text-lg font-semibold sm:text-xl">{project.title}</h3>
					</div>
					<span
						class="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium"
						style:color={statusColor[project.status]}
						style:border="1px solid {statusColor[project.status]}"
					>
						{statusLabel[project.status]}
					</span>
				</header>

				<p class="text-sm leading-relaxed" style:color="var(--text-muted)">
					{project.description}
				</p>

				<ul class="flex flex-wrap gap-2">
					{#each project.stack as s (s)}
						<li
							class="rounded-md px-2 py-0.5 font-mono text-xs"
							style:background="var(--accent-soft)"
							style:color="var(--accent)"
						>
							{s}
						</li>
					{/each}
				</ul>

				{#if project.links.length}
					<nav class="mt-auto flex flex-wrap gap-3 pt-2 text-sm">
						{#each project.links as link (link.label)}
							<a
								href={link.href}
								target="_blank"
								rel="noreferrer"
								class="inline-flex items-center gap-1 font-medium hover:underline"
								style:color="var(--accent)"
							>
								{link.label}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M7 17L17 7M8 7h9v9" />
								</svg>
							</a>
						{/each}
					</nav>
				{/if}
			</article>
		{/each}
	</div>
</Section>
