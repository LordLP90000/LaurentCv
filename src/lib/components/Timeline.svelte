<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
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
	<ol
		class="relative ml-2 flex flex-col gap-8 border-l pl-5 sm:ml-3 sm:gap-10 sm:pl-8"
		style:border-color="var(--border)"
		data-reveal-group
		data-reveal-step="90"
	>
		{#each experience as entry (entry.id)}
			{@const isOpen = open[entry.id]}
			<li class="relative">
				<span
					class="absolute top-2 -left-7.5 flex h-5 w-5 items-center justify-center rounded-full border-2 sm:-left-10.25"
					style:border-color="var(--accent)"
					style:background="var(--surface)"
				>
					<span class="h-2 w-2 rounded-full" style:background="var(--accent)"></span>
				</span>

				<div
					class="tilt-card rounded-xl border p-4 sm:p-5"
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
							<span
								class="inline-flex items-center gap-1 text-xs transition-colors"
								style:color="var(--text-muted)"
							>
								{isOpen ? 'Weniger anzeigen' : 'Details'}
								<svg
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
									style:transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
									style:transition="transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
								>
									<path d="M6 9l6 6 6-6" />
								</svg>
							</span>
						</div>
						<h3 class="text-lg font-semibold">{entry.role}</h3>
						<p class="text-sm" style:color="var(--text-muted)">
							{entry.company}{entry.location ? ` · ${entry.location}` : ''}
						</p>
					</button>

					{#if isOpen}
						<div
							id="timeline-{entry.id}"
							class="mt-4 flex flex-col gap-4"
							transition:slide={{ duration: 320, easing: cubicOut }}
						>
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
