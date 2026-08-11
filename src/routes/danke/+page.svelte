<script lang="ts">
	import Seo from '$components/Seo.svelte';
	import ResponsePromise from '$components/ResponsePromise.svelte';
	import { resolve } from '$app/paths';
</script>

<Seo
	title="Danke für deine Nachricht · Laurent Scherrer"
	description="Deine Nachricht ist angekommen — ich melde mich so schnell wie möglich."
	noindex
/>

<section
	class="mx-auto flex min-h-[70svh] w-full max-w-6xl flex-col justify-center px-4 pt-28 pb-12 md:px-6 md:pt-32"
>
	<p class="mb-4 font-mono text-sm" style:color="var(--text-muted)">
		<span style:color="var(--highlight)">$</span> send --status
		<span style:color="var(--highlight)">delivered ✓</span>
	</p>
	<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
		Danke — deine Nachricht ist
		<span
			class="bg-clip-text text-transparent"
			style:background-image="linear-gradient(135deg, var(--accent), var(--highlight))"
		>
			angekommen.
		</span>
	</h1>
	<p class="mt-6 max-w-xl text-base leading-relaxed sm:text-lg" style:color="var(--text-muted)">
		So geht es weiter: Ich lese jede Nachricht persönlich und melde mich per E-Mail bei dir. Du
		musst nichts weiter tun.
	</p>

	<div class="mt-6">
		<ResponsePromise />
	</div>

	<div class="mt-10 flex flex-wrap gap-3">
		<a
			href={resolve('/')}
			class="rounded-lg px-5 py-3 text-sm font-medium text-white shadow-(--ring) transition-transform hover:-translate-y-0.5"
			style:background="var(--accent)"
		>
			Zur Startseite
		</a>
		<a
			href={resolve('/projects')}
			class="rounded-lg border px-5 py-3 text-sm font-medium transition-colors hover:text-(--accent)"
			style:border-color="var(--border)"
		>
			Projekte ansehen
		</a>
	</div>
</section>
