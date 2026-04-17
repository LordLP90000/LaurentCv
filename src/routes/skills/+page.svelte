<script lang="ts">
	import Skills from '$components/Skills.svelte';
	import { profile } from '$data/profile';

	const title = `Skills · ${profile.name}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`Skills und Technologien von ${profile.name}.`} />
</svelte:head>

<div class="pt-24">
	<Skills />
</div>
