<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import JsonLd from './JsonLd.svelte';

	interface Props {
		/** Name of the current page, shown as the last crumb. */
		label: string;
	}

	let { label }: Props = $props();

	const schema = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: `${page.url.origin}/` },
			{
				'@type': 'ListItem',
				position: 2,
				name: label,
				item: `${page.url.origin}${page.url.pathname}`
			}
		]
	});
</script>

<JsonLd data={schema} />

<nav aria-label="Breadcrumb" class="mx-auto w-full max-w-6xl px-4 pt-6 md:px-6">
	<ol class="flex flex-wrap items-center gap-2 text-sm" style:color="var(--text-muted)">
		<li>
			<a href={resolve('/')} class="transition-colors hover:text-[var(--accent)]">Home</a>
		</li>
		<li aria-hidden="true">/</li>
		<li aria-current="page" class="font-medium" style:color="var(--text)">{label}</li>
	</ol>
</nav>
