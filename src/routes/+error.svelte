<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Seo from '$components/Seo.svelte';

	const isNotFound = $derived(page.status === 404);
	const title = $derived(
		isNotFound ? 'Seite nicht gefunden · Laurent Scherrer' : 'Fehler · Laurent Scherrer'
	);
</script>

<Seo
	{title}
	description="Diese Seite existiert nicht (mehr). Zurück zur Startseite oder direkt Kontakt aufnehmen."
	noindex
/>

<section class="flex min-h-[70svh] flex-col justify-center py-16">
	<p class="mb-5 font-mono text-xs tracking-[0.12em] text-copper">FEHLER — {page.status}</p>
	<h1 class="text-[clamp(3rem,10vw,5.5rem)] leading-none font-bold tracking-[-0.035em]">
		{page.status}
	</h1>
	<p class="mt-6 max-w-[560px] leading-[1.65] text-muted">
		{#if isNotFound}
			Diese Seite gibt es nicht — vielleicht ein Tippfehler in der URL, vielleicht habe ich sie
			umgebaut. Kein Problem: Von hier aus geht's weiter.
		{:else}
			Da ist etwas schiefgelaufen. Versuch es später noch einmal — oder sag mir kurz Bescheid.
		{/if}
	</p>
	<div class="mt-10 flex flex-wrap gap-6 text-sm font-medium">
		<a href={resolve('/')} class="border-b border-copper pb-0.5 text-copper">Zur Startseite →</a>
		<a
			href="{resolve('/')}#a-kontakt"
			class="border-b border-line-strong pb-0.5 transition-colors hover:border-copper hover:text-copper"
		>
			Kontakt →
		</a>
	</div>
</section>
