<script lang="ts">
	import Section from './Section.svelte';
	import { experiments } from '$data/lab';
</script>

<Section
	id="a-lab"
	num="06"
	title="Lab"
	lead="Werkstatt für Halbfertiges — Prototypen, die noch nicht produktionsreif sind, aber etwas erzählen."
>
	<ul>
		{#each experiments as x (x.title)}
			<li
				class="spec-row -mx-2.5 grid items-baseline gap-1 border-b border-line px-2.5 py-4 min-[900px]:grid-cols-[200px_1fr] min-[900px]:gap-8"
			>
				<span class="font-mono text-xs tracking-[0.08em] text-copper">{x.state.toUpperCase()}</span>
				<span>
					<span class="text-base font-semibold">{x.title}</span><br />
					<span class="text-sm leading-[1.65] text-muted">{x.description}</span>
				</span>
			</li>
		{/each}
	</ul>
	<p class="mt-6 font-mono text-[11px] tracking-[0.06em] text-muted">
		DIESE SEITE WÄCHST MIT — NEUE EXPERIMENTE, KEIN UI-REFACTORING.
	</p>
</Section>
