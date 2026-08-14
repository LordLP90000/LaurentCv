<script lang="ts">
	import Section from './Section.svelte';
	import { skillCategories, languages } from '$data/skills';
	import { interestAreas } from '$data/interests';

	const ticks = [1, 2, 3, 4, 5] as const;
</script>

<Section
	id="a-skills"
	num="03"
	title="Skills"
	lead="Skills aus beiden Ausbildungen. Die Levels folgen der Skala aus meinem offiziellen Lebenslauf — L1 Grundkenntnisse bis L5 Experte."
>
	<div class="grid gap-x-16 min-[900px]:grid-cols-2">
		{#each skillCategories as g (g.id)}
			<div class="mb-11">
				<h3
					class="flex items-baseline justify-between border-b border-line-strong pb-2.5 font-mono text-xs font-medium tracking-[0.1em]"
				>
					{g.title.toUpperCase()}<span class="text-muted"
						>{String(g.skills.length).padStart(2, '0')}</span
					>
				</h3>
				<ul>
					{#each g.skills as s (s.name)}
						<li class="flex items-baseline gap-3 border-b border-line py-2 text-sm">
							<span class="font-medium">{s.name}</span>
							<span class="flex-1 -translate-y-1 border-b border-dotted border-line-strong"></span>
							<span class="flex items-center gap-[3px]" aria-hidden="true">
								{#each ticks as t (t)}
									<span class="h-1 w-2.5 {t <= s.level ? 'bg-copper' : 'bg-line-strong'}"></span>
								{/each}
							</span>
							<span class="w-[22px] text-right font-mono text-xs text-muted">L{s.level}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="mt-2 grid gap-x-16 gap-y-11 min-[900px]:grid-cols-2">
		<div>
			<h3 class="border-b border-line-strong pb-2.5 font-mono text-xs font-medium tracking-[0.1em]">
				SPRACHEN
			</h3>
			<ul>
				{#each languages as l (l.name)}
					<li class="flex justify-between gap-3 border-b border-line py-2 text-sm">
						<span class="font-medium">{l.name}</span>
						<span class="text-right font-mono text-xs text-muted">{l.level.toUpperCase()}</span>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<h3 class="border-b border-line-strong pb-2.5 font-mono text-xs font-medium tracking-[0.1em]">
				INTERESSENSCHWERPUNKTE
			</h3>
			<ol>
				{#each interestAreas as i (i.priority)}
					<li class="border-b border-line py-3">
						<p class="text-sm font-semibold">
							<span class="mr-2.5 font-mono text-copper">{i.priority}</span>{i.title}
						</p>
						<p class="mt-1.5 ml-[26px] text-[13px] leading-[1.6] text-muted">{i.description}</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</Section>
