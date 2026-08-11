<script lang="ts">
	import Contact from '$components/Contact.svelte';
	import Seo from '$components/Seo.svelte';
	import Breadcrumbs from '$components/Breadcrumbs.svelte';
	import RelatedLinks from '$components/RelatedLinks.svelte';

	let { form } = $props();
</script>

<Seo
	title="Kontakt · Laurent Scherrer, Informatiker in Ausbildung"
	description="Nimm Kontakt auf — per Formular, E-Mail oder Telefon. Ob Security-Projekt, Tech-Austausch oder Zusammenarbeit: Ich freue mich auf deine Nachricht."
/>

<div class="pt-16 md:pt-20">
	<Breadcrumbs label="Kontakt" />
	<Contact {form} />
	<RelatedLinks
		links={[
			{
				route: '/projects',
				label: 'Projekte',
				description: 'Erst noch etwas stöbern? Meine Projekte mit Stack und Status.'
			},
			{
				route: '/about',
				label: 'Über mich',
				description: 'Wer dir hier eigentlich antwortet.'
			}
		]}
	/>
</div>
