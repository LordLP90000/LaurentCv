<script lang="ts">
	import Contact from '$components/Contact.svelte';
	import { profile } from '$data/profile';

	let { form } = $props();

	const title = `Kontakt · ${profile.name}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`Kontakt zu ${profile.name}.`} />
</svelte:head>

<div class="pt-24">
	<Contact {form} />
</div>
