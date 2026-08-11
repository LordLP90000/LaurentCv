<script lang="ts">
	interface Props {
		data: Record<string, unknown>;
	}

	let { data }: Props = $props();

	// Escape "<" so user-provided strings can never close the script tag early.
	const json = $derived(JSON.stringify(data).replace(/</g, '\\u003c'));
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- json is stringified with "<" escaped, no user HTML can break out -->
	{@html `<script type="application/ld+json">${json}<` + `/script>`}
</svelte:head>
