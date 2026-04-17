<script lang="ts">
	import { experience } from '$data/experience';
	import Section from './Section.svelte';

	let open = $state<Record<string, boolean>>(
		Object.fromEntries(experience.map((e) => [e.id, e === experience[0]]))
	);
</script>

<Section
	id="experience"
	eyebrow="Werdegang"
	title="Vom Schaltschrank zur Shell."
	lead="Erstausbildung zum Elektroinstallateur EFZ, jetzt Zweitausbildung zum Informatiker — Hardware-Intuition trifft Software-Engineering."
>
	<ol class="relative ml-3 flex flex-col gap-10 border-l pl-8" style:border-color="var(--border)">
		{#each experience as entry (entry.id)}
			{@const isOpen = open[entry.id]}
			<li class="relative">
				<span
					class="absolute top-2 -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2"
					style:border-color="var(--accent)"
					style:background="var(--surface)"
				>
					<span class="h-2 w-2 rounded-full" style:background="var(--accent)"></span>
				</span>

				<div
					class="rounded-xl border p-5 transition-colors"
					style:border-color="var(--border)"
					style:background="var(--surface-muted)"
				>
					<button
						type="button"
						class="flex w-full flex-col gap-1 text-left"
						aria-expanded={isOpen}
						aria-controls="timeline-{entry.id}"
						onclick={() => (open[entry.id] = !isOpen)}
					>
						<div class="flex flex-wrap items-center justify-between gap-2">
							<span class="font-mono text-xs tracking-wider uppercase" style:color="var(--accent)"
								>{entry.period}</span
							>
							<span class="text-xs" style:color="var(--text-muted)">
								{isOpen ? 'Weniger anzeigen' : 'Details'}
							</span>
						</div>
						<h3 class="text-lg font-semibold">{entry.role}</h3>
						<p class="text-sm" style:color="var(--text-muted)">
							{entry.company}{entry.location ? ` · ${entry.location}` : ''}
						</p>
					</button>

					{#if isOpen}
						<div id="timeline-{entry.id}" class="mt-4 flex flex-col gap-4">
							<p class="text-sm leading-relaxed">{entry.summary}</p>
							<ul class="flex flex-col gap-2 text-sm" style:color="var(--text-muted)">
								{#each entry.highlights as h (h)}
									<li class="flex gap-2">
										<span style:color="var(--highlight)">▹</span>
										<span>{h}</span>
									</li>
								{/each}
							</ul>
							<div class="flex flex-wrap gap-2 pt-1">
								{#each entry.tags as tag (tag)}
									<span
										class="rounded-md px-2 py-0.5 font-mono text-xs"
										style:background="var(--accent-soft)"
										style:color="var(--accent)"
									>
										{tag}
									</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</li>
		{/each}
	</ol>
</Section>
