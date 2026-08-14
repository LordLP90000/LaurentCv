<script lang="ts">
	import { page } from '$app/state';
	import Section from './Section.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { education } from '$data/education';

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale].ausbildung);
	const entries = $derived(education[locale]);
</script>

<Section id="a-ausbildung" num="05" title={t.title}>
	<ul>
		{#each entries as e (e.id)}
			<li
				class="spec-row -mx-2.5 grid items-baseline gap-1 border-b border-line px-2.5 py-4 min-[900px]:grid-cols-[200px_1fr_120px] min-[900px]:gap-8"
			>
				<span class="font-mono text-[13px]">{e.period}</span>
				<span>
					<span class="text-[15px] font-semibold">{e.title}</span><span class="text-sm text-muted">
						· {e.institution}</span
					>
				</span>
				<span class="font-mono text-[11px] tracking-[0.08em] text-muted min-[900px]:text-right">
					{t.type[e.type]}
				</span>
			</li>
		{/each}
	</ul>
</Section>
