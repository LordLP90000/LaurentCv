<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';
</script>

<button
	type="button"
	onclick={() => theme.toggle()}
	aria-label="Farbschema wechseln"
	class="self-start border border-line-strong px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] text-ink transition-colors hover:border-copper hover:text-copper"
>
	{theme.value === 'dark' ? 'MODUS: DUNKEL' : 'MODUS: HELL'}
</button>
