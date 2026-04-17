<script lang="ts">
	import Section from '$components/Section.svelte';

	const experiments = [
		{
			title: 'Security Sandbox',
			description:
				'Hier werden Experimente zu Vulnerability Scanning, Logging-Pipelines und Zero-Trust-Konzepten landen.',
			state: 'geplant'
		},
		{
			title: 'OPC UA Playground',
			description: 'Kleine Demos zur Kommunikation zwischen industriellen Geräten und modernen Web-Frontends.',
			state: 'skizziert'
		},
		{
			title: 'Svelte + Industrie-UI',
			description: 'Prototypen für Oberflächen, die direkt mit Maschinen sprechen — inspiriert von Angular-Frontends bei Delta.',
			state: 'bald'
		}
	];
</script>

<svelte:head>
	<title>Lab · Laurent Scherrer</title>
	<meta
		name="description"
		content="Experimente, Prototypen und Skizzen aus der Werkstatt von Laurent Scherrer."
	/>
</svelte:head>

<div class="pt-28 md:pt-32">
	<Section
		id="lab"
		eyebrow="Tech Lab"
		title="Werkstatt für Halbfertiges."
		lead="Ein Raum für Prototypen, die noch nicht produktionsreif sind — aber etwas erzählen."
	>
		<div class="grid gap-4 md:grid-cols-2">
			{#each experiments as exp (exp.title)}
				<article
					class="flex flex-col gap-3 rounded-2xl border p-6"
					style:border-color="var(--border)"
					style:background="var(--surface-muted)"
				>
					<span
						class="w-fit rounded-md px-2 py-0.5 font-mono text-xs"
						style:background="var(--accent-soft)"
						style:color="var(--accent)"
					>
						{exp.state}
					</span>
					<h3 class="text-lg font-semibold">{exp.title}</h3>
					<p class="text-sm leading-relaxed" style:color="var(--text-muted)">{exp.description}</p>
				</article>
			{/each}
		</div>

		<p class="mt-10 text-sm" style:color="var(--text-muted)">
			Diese Seite wächst mit. Neue Experimente werden einfach der Datendatei hinzugefügt — kein
			UI-Refactoring nötig.
		</p>
	</Section>
</div>
