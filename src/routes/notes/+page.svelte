<script lang="ts">
	import Section from '$components/Section.svelte';
	import Seo from '$components/Seo.svelte';
	import Breadcrumbs from '$components/Breadcrumbs.svelte';
	import RelatedLinks from '$components/RelatedLinks.svelte';

	interface Note {
		slug: string;
		title: string;
		date: string;
		excerpt: string;
	}

	const notes: Note[] = [
		{
			slug: 'vom-schaltschrank-zur-shell',
			title: 'Vom Schaltschrank zur Shell',
			date: '2026-03-01',
			excerpt:
				'Was meine Elektriker-Lehre mir über Software beigebracht hat — und warum Siemens Logo ein überraschend guter Einstieg in Logik war.'
		},
		{
			slug: 'security-als-einsteiger',
			title: 'Security als Einsteiger: Erwartung vs. Realität',
			date: '2026-02-12',
			excerpt:
				'Notizen dazu, warum Security mich wirklich interessiert — jenseits der Hollywood-Vorstellung vom Hacker.'
		}
	];

	const formatter = new Intl.DateTimeFormat('de-CH', { dateStyle: 'long' });
</script>

<Seo
	title="Notes — Write-ups & Notizen · Laurent Scherrer"
	description="Kurze Write-ups und Notizen von Laurent Scherrer: vom Schaltschrank zur Shell, Security als Einsteiger und weitere Themen, mit denen ich mich gerade beschäftige."
/>

<div class="pt-16 md:pt-20">
	<Breadcrumbs label="Notes" />
	<Section
		id="notes"
		eyebrow="Notes"
		title="Kurze Write-ups."
		lead="Notizen zu Themen, mit denen ich mich gerade beschäftige. Noch in Vorbereitung — Inhalte folgen."
	>
		<ul class="flex flex-col gap-4">
			{#each notes as note (note.slug)}
				<li>
					<article
						class="flex flex-col gap-2 rounded-2xl border p-6"
						style:border-color="var(--border)"
						style:background="var(--surface-muted)"
					>
						<time
							class="font-mono text-xs tracking-wider uppercase"
							style:color="var(--text-muted)"
							datetime={note.date}
						>
							{formatter.format(new Date(note.date))}
						</time>
						<h3 class="text-lg font-semibold">{note.title}</h3>
						<p class="text-sm leading-relaxed" style:color="var(--text-muted)">{note.excerpt}</p>
						<span class="mt-2 text-xs" style:color="var(--text-muted)">(draft — kommt bald)</span>
					</article>
				</li>
			{/each}
		</ul>
	</Section>
	<RelatedLinks
		links={[
			{
				route: '/lab',
				label: 'Tech Lab',
				description: 'Die Experimente hinter den Write-ups.'
			},
			{
				route: '/contact',
				label: 'Kontakt',
				description: 'Fragen oder Feedback zu einem Thema? Schreib mir.'
			}
		]}
	/>
</div>
