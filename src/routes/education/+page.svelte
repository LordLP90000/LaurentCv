<script lang="ts">
	import Education from '$components/Education.svelte';
	import Seo from '$components/Seo.svelte';
	import Breadcrumbs from '$components/Breadcrumbs.svelte';
	import RelatedLinks from '$components/RelatedLinks.svelte';
</script>

<Seo
	title="Ausbildung & Zertifikate · Laurent Scherrer"
	description="Ausbildung & Zertifikate: Applikationsentwickler EFZ (laufend), Elektroinstallateur EFZ, Wirtschaftsmittelschule Luzern und Cambridge B2 First Zertifikat."
/>

<div class="pt-16 md:pt-20">
	<Breadcrumbs label="Ausbildung" />
	<Education />
	<RelatedLinks
		links={[
			{
				route: '/experience',
				label: 'Werdegang',
				description: 'Die beruflichen Stationen hinter den Abschlüssen.'
			},
			{
				route: '/about',
				label: 'Über mich',
				description: 'Wer hinter den zwei Ausbildungen steckt.'
			}
		]}
	/>
</div>
