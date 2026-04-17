<script lang="ts">
	import Timeline from '$components/Timeline.svelte';
	import { profile } from '$data/profile';

	const title = `Werdegang · ${profile.name}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`Berufliche Stationen von ${profile.name}.`} />
</svelte:head>

<div class="pt-16 md:pt-20">
	<Timeline />
</div>
