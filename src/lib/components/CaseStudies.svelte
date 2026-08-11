<script lang="ts">
	import { caseStudies } from '$data/caseStudies';
	import Section from './Section.svelte';

	const steps = [
		{ key: 'challenge', label: 'Herausforderung' },
		{ key: 'solution', label: 'Lösung' },
		{ key: 'result', label: 'Ergebnis' }
	] as const;
</script>

<Section
	id="case-studies"
	eyebrow="Case Studies"
	title="Wie ich Probleme angehe."
	lead="Nicht nur was ich gebaut habe, sondern wie: Ausgangslage, Vorgehen und was am Ende dabei herausgekommen ist."
>
	<div class="flex flex-col gap-5" data-reveal-group data-reveal-step="90">
		{#each caseStudies as study (study.id)}
			<article
				class="tilt-card flex flex-col gap-4 rounded-2xl border p-5 sm:p-6"
				style:border-color="var(--border)"
				style:background="var(--surface-muted)"
			>
				<header class="flex flex-col gap-1">
					<span
						class="w-fit rounded-md px-2 py-0.5 font-mono text-xs"
						style:background="var(--accent-soft)"
						style:color="var(--accent)"
					>
						{study.context}
					</span>
					<h3 class="text-lg font-semibold sm:text-xl">{study.title}</h3>
				</header>

				<dl class="grid gap-4 md:grid-cols-3">
					{#each steps as step (step.key)}
						<div class="flex flex-col gap-1">
							<dt
								class="text-xs font-semibold tracking-wider uppercase"
								style:color="var(--text-muted)"
							>
								{step.label}
							</dt>
							<dd class="text-sm leading-relaxed">{study[step.key]}</dd>
						</div>
					{/each}
				</dl>
			</article>
		{/each}
	</div>
</Section>
