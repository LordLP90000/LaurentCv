<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { consent } from '$lib/stores/consent.svelte';

	// Without a configured GA ID there is nothing to consent to.
	const gaId = env.PUBLIC_GA_ID;
	const visible = $derived(Boolean(gaId) && consent.value === 'unknown');
	const t = $derived(ui[localeOf(page.params)].cookie);
</script>

{#if visible}
	<section
		aria-label={t.label}
		class="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md border border-line-strong bg-card p-4 shadow-lg md:inset-x-auto md:right-6 md:bottom-6 md:mx-0"
	>
		<p class="text-sm leading-relaxed">
			{t.text}
			<a
				href={resolve('/datenschutz')}
				class="text-muted underline transition-colors hover:text-copper"
			>
				{t.more}
			</a>
		</p>
		<div class="mt-4 flex gap-3">
			<button
				type="button"
				class="flex-1 border border-line-strong px-4 py-2 text-sm font-medium transition-colors hover:border-copper hover:text-copper"
				onclick={() => consent.set('denied')}
			>
				{t.decline}
			</button>
			<button
				type="button"
				class="flex-1 bg-copper px-4 py-2 text-sm font-medium text-white"
				onclick={() => consent.set('granted')}
			>
				{t.accept}
			</button>
		</div>
	</section>
{/if}
