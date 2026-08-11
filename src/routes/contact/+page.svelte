<script lang="ts">
	import Contact from '$components/Contact.svelte';
	import Seo from '$components/Seo.svelte';

	let { form } = $props();
</script>

<Seo
	title="Kontakt · Laurent Scherrer, Informatiker in Ausbildung"
	description="Nimm Kontakt auf — per Formular, E-Mail oder Telefon. Ob Security-Projekt, Tech-Austausch oder Zusammenarbeit: Ich freue mich auf deine Nachricht."
/>

<div class="pt-16 md:pt-20">
	<Contact {form} />
</div>
