<script lang="ts">
	import { page } from '$app/state';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { faq } from '$data/faq';
	import JsonLd from './JsonLd.svelte';

	const locale = $derived(localeOf(page.params));
	const entries = $derived(faq[locale]);

	const schema = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: entries.map((entry) => ({
			'@type': 'Question',
			name: entry.question,
			acceptedAnswer: { '@type': 'Answer', text: entry.answer }
		}))
	});
</script>

<JsonLd data={schema} />

<div class="mt-16 max-w-[720px]">
	<h3 class="border-b border-line-strong pb-2.5 font-mono text-xs font-medium tracking-[0.1em]">
		{ui[locale].kontakt.faqTitle}
	</h3>
	{#each entries as entry (entry.question)}
		<details class="group border-b border-line">
			<summary
				class="flex cursor-pointer items-baseline justify-between gap-4 py-3.5 text-[15px] font-medium select-none"
			>
				{entry.question}
				<span
					class="shrink-0 font-mono text-copper transition-transform group-open:rotate-45"
					aria-hidden="true">+</span
				>
			</summary>
			<p class="max-w-[640px] pb-4 text-sm leading-[1.7] text-muted">{entry.answer}</p>
		</details>
	{/each}
</div>
