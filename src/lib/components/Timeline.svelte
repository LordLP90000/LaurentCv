<script lang="ts">
	import { page } from '$app/state';
	import Section from './Section.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { experience } from '$data/experience';

	const locale = $derived(localeOf(page.params));
	const jobs = $derived(experience[locale]);
</script>

<Section id="a-werdegang" num="02" title={ui[locale].werdegang.title}>
	<div class="flex flex-col" data-reveal-group data-reveal-step="90">
		{#each jobs as job (job.id)}
			<article
				class="grid gap-4 border-b border-line py-9 min-[900px]:grid-cols-[200px_1fr] min-[900px]:gap-8"
			>
				<div>
					<p class="font-mono text-[13px]">{job.period}</p>
					{#if job.location}
						<p class="mt-1.5 font-mono text-xs leading-relaxed text-muted">{job.location}</p>
					{/if}
				</div>
				<div>
					<h3 class="text-[26px] leading-tight font-semibold tracking-[-0.015em]">{job.role}</h3>
					<p class="mt-1.5 font-mono text-[13px] text-copper">{job.company.toUpperCase()}</p>
					<p class="mt-4 text-[15px] leading-[1.7] text-muted">{job.summary}</p>
					<ul class="mt-4 flex flex-col gap-2">
						{#each job.highlights as h (h)}
							<li class="flex gap-3 text-[15px] leading-relaxed">
								<span class="text-copper" aria-hidden="true">→</span><span>{h}</span>
							</li>
						{/each}
					</ul>
					<p class="mt-4 font-mono text-xs tracking-[0.04em] text-muted">
						{job.tags.join(' · ').toUpperCase()}
					</p>
				</div>
			</article>
		{/each}
	</div>
</Section>
