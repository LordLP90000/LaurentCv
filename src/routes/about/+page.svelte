<script lang="ts">
	import About from '$components/About.svelte';
	import { profile } from '$data/profile';

	const title = `Über mich · ${profile.name}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`Über ${profile.name} — Informatiker in Ausbildung.`} />
</svelte:head>

<div class="pt-24">
	<About />
</div>
