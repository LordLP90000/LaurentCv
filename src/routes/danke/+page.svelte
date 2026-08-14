<script lang="ts">
	import Seo from '$components/Seo.svelte';
	import { responseTimePromise } from '$data/site';
	import { resolve } from '$app/paths';
</script>

<Seo
	title="Danke für deine Nachricht · Laurent Scherrer"
	description="Deine Nachricht ist angekommen — ich melde mich so schnell wie möglich."
	noindex
/>

<section class="flex min-h-[70svh] flex-col justify-center py-16">
	<p class="mb-5 font-mono text-xs tracking-[0.12em] text-copper">STATUS — ZUGESTELLT ✓</p>
	<h1 class="text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.1] font-bold tracking-[-0.025em]">
		Danke — deine Nachricht ist angekommen.
	</h1>
	<p class="mt-6 max-w-[560px] leading-[1.65] text-muted">
		So geht es weiter: Ich lese jede Nachricht persönlich und melde mich per E-Mail bei dir. Du
		musst nichts weiter tun. {responseTimePromise}
	</p>
	<div class="mt-10 flex flex-wrap gap-6 text-sm font-medium">
		<a href={resolve('/')} class="border-b border-copper pb-0.5 text-copper">Zur Startseite →</a>
		<a
			href="{resolve('/')}#a-projekte"
			class="border-b border-line-strong pb-0.5 transition-colors hover:border-copper hover:text-copper"
		>
			Projekte ansehen →
		</a>
	</div>
</section>
