<script lang="ts">
	import Section from './Section.svelte';
	import { notes } from '$data/notes';

	const formatter = new Intl.DateTimeFormat('de-CH', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});
</script>

<Section
	id="a-notes"
	num="07"
	title="Notes"
	lead="Kurze Write-ups zu Themen, mit denen ich mich gerade beschäftige. Noch in Vorbereitung — Inhalte folgen."
>
	<ul>
		{#each notes as n (n.slug)}
			<li
				class="spec-row -mx-2.5 grid gap-1 border-b border-line px-2.5 py-5 min-[900px]:grid-cols-[200px_1fr] min-[900px]:gap-8"
			>
				<span class="font-mono text-xs text-muted">
					<time datetime={n.date}>{formatter.format(new Date(n.date))}</time><br />
					<span class="text-copper">DRAFT</span>
				</span>
				<span>
					<span class="text-lg font-semibold">{n.title}</span><br />
					<span class="text-sm leading-[1.65] text-muted">{n.excerpt}</span>
				</span>
			</li>
		{/each}
	</ul>
</Section>
