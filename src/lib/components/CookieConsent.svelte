<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { resolve } from '$app/paths';
	import { consent } from '$lib/stores/consent.svelte';

	// Without a configured GA ID there is nothing to consent to.
	const gaId = env.PUBLIC_GA_ID;
	const visible = $derived(Boolean(gaId) && consent.value === 'unknown');
</script>

{#if visible}
	<section
		aria-label="Cookie-Hinweis"
		class="fixed inset-x-4 bottom-20 z-50 mx-auto max-w-md rounded-2xl border p-4 shadow-lg backdrop-blur md:inset-x-auto md:right-6 md:bottom-6 md:mx-0"
		style:background="color-mix(in srgb, var(--surface-muted) 95%, transparent)"
		style:border-color="var(--border)"
	>
		<p class="text-sm leading-relaxed">
			Ich würde gerne mit Google Analytics verstehen, wie diese Seite genutzt wird — aber nur mit
			deinem Einverständnis. Ohne Zustimmung wird nichts geladen.
			<a
				href={resolve('/datenschutz')}
				class="underline transition-colors hover:text-[var(--accent)]"
				style:color="var(--text-muted)"
			>
				Mehr dazu in der Datenschutzerklärung.
			</a>
		</p>
		<div class="mt-4 flex gap-3">
			<button
				type="button"
				class="flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:text-[var(--accent)]"
				style:border-color="var(--border)"
				onclick={() => consent.set('denied')}
			>
				Ablehnen
			</button>
			<button
				type="button"
				class="flex-1 rounded-lg px-4 py-2 text-sm font-medium text-white"
				style:background="var(--accent)"
				onclick={() => consent.set('granted')}
			>
				Einverstanden
			</button>
		</div>
	</section>
{/if}
