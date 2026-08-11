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

<section
	class="mx-auto flex min-h-[70svh] w-full max-w-6xl flex-col justify-center px-4 pt-28 pb-12 md:px-6 md:pt-32"
>
	<p class="mb-4 font-mono text-sm" style:color="var(--text-muted)">
		<span style:color="var(--highlight)">$</span> curl -I {page.url.pathname}
	</p>
	<h1 class="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
		<span
			class="bg-clip-text text-transparent"
			style:background-image="linear-gradient(135deg, var(--accent), var(--highlight))"
		>
			{page.status}
		</span>
	</h1>
	<p class="mt-6 max-w-xl text-base sm:text-lg" style:color="var(--text-muted)">
		{#if isNotFound}
			Diese Seite gibt es nicht — vielleicht ein Tippfehler in der URL, vielleicht habe ich sie
			umgebaut. Kein Problem: Von hier aus geht's weiter.
		{:else}
			Da ist etwas schiefgelaufen. Versuch es später noch einmal — oder sag mir kurz Bescheid.
		{/if}
	</p>

	<div class="mt-10 flex flex-wrap gap-3">
		<a
			href={resolve('/')}
			class="rounded-lg px-5 py-3 text-sm font-medium text-white shadow-(--ring) transition-transform hover:-translate-y-0.5"
			style:background="var(--accent)"
		>
			Zur Startseite
		</a>
		<a
			href={resolve('/contact')}
			class="rounded-lg border px-5 py-3 text-sm font-medium transition-colors hover:text-(--accent)"
			style:border-color="var(--border)"
		>
			Kontakt aufnehmen
		</a>
	</div>
</section>
