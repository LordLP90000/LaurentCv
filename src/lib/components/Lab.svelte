<script lang="ts">
	import { page } from '$app/state';
	import Section from './Section.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { experiments } from '$data/lab';

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale].lab);
	const items = $derived(experiments[locale]);
</script>

<Section id="a-lab" num="06" title={t.title} lead={t.lead}>
	<ul>
		{#each items as x (x.title)}
			<li
				class="spec-row -mx-2.5 grid items-baseline gap-1 border-b border-line px-2.5 py-4 min-[900px]:grid-cols-[200px_1fr] min-[900px]:gap-8"
			>
				<span class="font-mono text-xs tracking-[0.08em] text-copper">{t.state[x.state]}</span>
				<span>
					<span class="text-base font-semibold">{x.title}</span><br />
					<span class="text-sm leading-[1.65] text-muted">{x.description}</span>
				</span>
			</li>
		{/each}
	</ul>
	<p class="mt-6 font-mono text-[11px] tracking-[0.06em] text-muted">
		{t.footnote}
	</p>
</Section>
