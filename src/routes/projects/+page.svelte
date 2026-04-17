<script lang="ts">
	import Projects from '$components/Projects.svelte';
	import { profile } from '$data/profile';

	const title = `Projekte · ${profile.name}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`Projekte und Experimente von ${profile.name}.`} />
</svelte:head>

<div class="pt-24">
	<Projects />
</div>
