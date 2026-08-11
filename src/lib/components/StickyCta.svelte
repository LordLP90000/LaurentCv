<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { profile } from '$data/profile';

	// Hidden where it would be redundant or in the way.
	const hiddenOn = ['/contact', '/danke'];
	const visible = $derived(!hiddenOn.includes(page.url.pathname));
</script>

{#if visible}
	<!-- In-flow spacer so the fixed bar never covers the footer links. -->
	<div class="h-16 md:hidden" aria-hidden="true"></div>

	<nav
		class="fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur md:hidden"
		aria-label="Schnellkontakt"
		style:background="color-mix(in srgb, var(--surface-muted) 92%, transparent)"
		style:border-color="var(--border)"
		style:padding-bottom="env(safe-area-inset-bottom)"
	>
		<div class="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
			<a
				href="tel:{profile.phone.replace(/\s/g, '')}"
				class="flex-1 rounded-lg border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:text-[var(--accent)]"
				style:border-color="var(--border)"
			>
				Anrufen
			</a>
			<a
				href={resolve('/contact')}
				class="flex-1 rounded-lg px-4 py-2.5 text-center text-sm font-medium text-white"
				style:background="var(--accent)"
			>
				Nachricht senden
			</a>
		</div>
	</nav>
{/if}
