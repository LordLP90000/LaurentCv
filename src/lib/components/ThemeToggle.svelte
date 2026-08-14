<script lang="ts">
	import { page } from '$app/state';
	import { theme } from '$lib/stores/theme.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';

	let { compact = false }: { compact?: boolean } = $props();

	const t = $derived(ui[localeOf(page.params)].theme);
</script>

<button
	type="button"
	onclick={() => theme.toggle()}
	aria-label={t.label}
	class="self-start border border-line-strong px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] text-ink transition-colors hover:border-copper hover:text-copper"
>
	{theme.value === 'dark' ? (compact ? t.darkShort : t.dark) : compact ? t.lightShort : t.light}
</button>
