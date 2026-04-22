<script lang="ts">
	import { education, type Education } from '$data/education';
	import Section from './Section.svelte';

	const typeLabel: Record<Education['type'], string> = {
		apprenticeship: 'Lehre',
		school: 'Schule',
		certification: 'Zertifikat'
	};
</script>

<Section
	id="education"
	eyebrow="Ausbildung"
	title="Ausbildung & Zertifikate."
	lead="Zwei Lehren, Wirtschaftsmittelschule und ein Sprachzertifikat."
>
	<ul class="flex flex-col gap-3" data-reveal-group data-reveal-step="70">
		{#each education as item (item.id)}
			<li
				class="tilt-card flex flex-col gap-3 rounded-xl border p-5 md:flex-row md:items-center md:justify-between"
				style:border-color="var(--border)"
				style:background="var(--surface-muted)"
			>
				<div class="flex flex-col gap-1">
					<div class="flex items-center gap-2">
						<span
							class="rounded-md px-2 py-0.5 font-mono text-xs"
							style:background="var(--accent-soft)"
							style:color="var(--accent)"
						>
							{typeLabel[item.type]}
						</span>
						<span class="font-mono text-xs" style:color="var(--text-muted)">{item.period}</span>
					</div>
					<h3 class="text-base font-semibold">{item.title}</h3>
					<p class="text-sm" style:color="var(--text-muted)">{item.institution}</p>
					{#if item.description}
						<p class="text-sm leading-relaxed">{item.description}</p>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</Section>
