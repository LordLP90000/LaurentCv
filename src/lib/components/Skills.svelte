<script lang="ts">
	import { skillCategories, skillLegend, languages } from '$data/skills';
	import { interestAreas } from '$data/interests';
	import Section from './Section.svelte';

	let active = $state(skillCategories[0].id);
	const current = $derived(skillCategories.find((c) => c.id === active) ?? skillCategories[0]);
</script>

<Section
	id="skills"
	eyebrow="Skills"
	title="Was ich kann — und woran ich arbeite."
	lead="Skills aus beiden Ausbildungen. Die Levels folgen der Skala aus meinem offiziellen Lebenslauf."
>
	<div class="flex flex-wrap gap-2 pb-8">
		{#each skillCategories as cat (cat.id)}
			<button
				type="button"
				onclick={() => (active = cat.id)}
				class="rounded-full border px-4 py-2 text-sm transition-colors"
				style:border-color={active === cat.id ? 'var(--accent)' : 'var(--border)'}
				style:color={active === cat.id ? 'var(--accent)' : 'var(--text-muted)'}
				style:background={active === cat.id ? 'var(--accent-soft)' : 'transparent'}
			>
				{cat.title}
			</button>
		{/each}
	</div>

	<p class="mb-6 text-sm" style:color="var(--text-muted)">{current.description}</p>

	<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each current.skills as skill (skill.name)}
			<div
				class="group flex flex-col gap-3 rounded-xl border p-4 transition-transform hover:-translate-y-0.5"
				style:border-color="var(--border)"
				style:background="var(--surface-muted)"
			>
				<div class="flex items-center justify-between gap-2">
					<span class="font-medium">{skill.name}</span>
					<span
						class="rounded-md px-2 py-0.5 font-mono text-xs"
						style:background="var(--accent-soft)"
						style:color="var(--accent)"
					>
						L{skill.level}
					</span>
				</div>
				<div class="flex gap-1" aria-label="Level {skill.level} von 5">
					{#each [1, 2, 3, 4, 5] as n (n)}
						<span
							class="h-1 flex-1 rounded-full"
							style:background={n <= skill.level ? 'var(--accent)' : 'var(--border)'}
						></span>
					{/each}
				</div>
				<span class="text-xs" style:color="var(--text-muted)">{skillLegend[skill.level]}</span>
			</div>
		{/each}
	</div>

	<div class="mt-16 grid gap-8 md:grid-cols-2">
		<div>
			<h3 class="mb-4 text-sm font-semibold tracking-wider uppercase" style:color="var(--text-muted)">
				Sprachen
			</h3>
			<ul class="flex flex-col gap-2">
				{#each languages as lang (lang.name)}
					<li
						class="flex items-center justify-between rounded-lg border p-3 text-sm"
						style:border-color="var(--border)"
						style:background="var(--surface-muted)"
					>
						<span class="font-medium">{lang.name}</span>
						<span style:color="var(--text-muted)">{lang.level}</span>
					</li>
				{/each}
			</ul>
		</div>

		<div>
			<h3 class="mb-4 text-sm font-semibold tracking-wider uppercase" style:color="var(--text-muted)">
				Interessenschwerpunkte
			</h3>
			<ul class="flex flex-col gap-3">
				{#each interestAreas as area (area.priority)}
					<li
						class="rounded-lg border p-4"
						style:border-color="var(--border)"
						style:background="var(--surface-muted)"
					>
						<div class="flex items-center gap-3">
							<span
								class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold"
								style:background="var(--accent-soft)"
								style:color="var(--accent)"
							>
								#{area.priority}
							</span>
							<span class="font-medium">{area.title}</span>
						</div>
						<p class="mt-2 text-sm leading-relaxed" style:color="var(--text-muted)">
							{area.description}
						</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Section>
