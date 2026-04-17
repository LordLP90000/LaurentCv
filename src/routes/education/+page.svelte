<script lang="ts">
	import Education from '$components/Education.svelte';
	import { profile } from '$data/profile';

	const title = `Ausbildung · ${profile.name}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`Ausbildung und Zertifikate von ${profile.name}.`} />
</svelte:head>

<div class="pt-16 md:pt-20">
	<Education />
</div>
