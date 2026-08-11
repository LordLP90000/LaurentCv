<script lang="ts">
	import { faq } from '$data/faq';
	import Section from './Section.svelte';
	import JsonLd from './JsonLd.svelte';

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faq.map((entry) => ({
			'@type': 'Question',
			name: entry.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: entry.answer
			}
		}))
	};
</script>

<JsonLd data={schema} />

<Section
	id="faq"
	eyebrow="FAQ"
	title="Häufige Fragen."
	lead="Kurz beantwortet, was Besucher:innen am häufigsten wissen wollen."
>
	<div class="flex max-w-3xl flex-col gap-3" data-reveal-group data-reveal-step="60">
		{#each faq as entry (entry.question)}
			<details
				class="group rounded-xl border p-1"
				style:border-color="var(--border)"
				style:background="var(--surface-muted)"
			>
				<summary
					class="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-4 py-3 font-medium select-none"
				>
					{entry.question}
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
						class="shrink-0 transition-transform group-open:rotate-180"
						style:color="var(--accent)"
					>
						<path d="M6 9l6 6 6-6" />
					</svg>
				</summary>
				<p class="px-4 pt-1 pb-4 text-sm leading-relaxed" style:color="var(--text-muted)">
					{entry.answer}
				</p>
			</details>
		{/each}
	</div>
</Section>
