<script lang="ts">
	import { testimonials } from '$data/testimonials';
	import Section from './Section.svelte';

	// Bewusst KEIN Review-/AggregateRating-JSON-LD: Solange hier Platzhalter
	// stehen, dürfen keine strukturierten Bewertungsdaten ausgegeben werden.
</script>

<Section
	id="referenzen"
	eyebrow="Referenzen"
	title="Was andere sagen."
	lead="Stimmen von Menschen, die mit mir gearbeitet oder mich ausgebildet haben."
>
	<div class="grid gap-5 md:grid-cols-2" data-reveal-group data-reveal-step="80">
		{#each testimonials as t (t.id)}
			<figure
				class="tilt-card flex flex-col gap-4 rounded-2xl border p-5 sm:p-6"
				style:border-color="var(--border)"
				style:background="var(--surface-muted)"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="currentColor"
					aria-hidden="true"
					style:color="var(--accent)"
				>
					<path
						d="M10 8c-3 0-5 2-5 5.5V18h6v-6H8c0-1.7 1-2.5 2-2.5V8zm9 0c-3 0-5 2-5 5.5V18h6v-6h-3c0-1.7 1-2.5 2-2.5V8z"
					/>
				</svg>
				<blockquote class="text-sm leading-relaxed sm:text-base">
					{t.quote}
				</blockquote>
				<figcaption class="mt-auto flex flex-col text-sm">
					<span class="font-medium">{t.author}</span>
					<span style:color="var(--text-muted)">{t.role}</span>
				</figcaption>
			</figure>
		{/each}
	</div>
</Section>
