<script lang="ts">
	import { page } from '$app/state';
	import { profile } from '$data/profile';

	interface Props {
		title: string;
		description: string;
		/** Path relative to the site root or absolute URL. */
		image?: string;
		type?: 'website' | 'profile' | 'article';
		noindex?: boolean;
	}

	let {
		title,
		description,
		image = '/og-image.png',
		type = 'website',
		noindex = false
	}: Props = $props();

	const canonical = $derived(`${page.url.origin}${page.url.pathname}`);
	const absoluteImage = $derived(image.startsWith('http') ? image : `${page.url.origin}${image}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<link rel="canonical" href={canonical} />
	{/if}
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={profile.name} />
	<meta property="og:locale" content="de_CH" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={absoluteImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={absoluteImage} />
</svelte:head>
