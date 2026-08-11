<script lang="ts">
	import About from '$components/About.svelte';
	import Seo from '$components/Seo.svelte';
	import Breadcrumbs from '$components/Breadcrumbs.svelte';
	import RelatedLinks from '$components/RelatedLinks.svelte';
</script>

<Seo
	title="Über mich · Laurent Scherrer, Informatiker in Ausbildung"
	description="Vom Elektroinstallateur EFZ zum Informatiker: wer ich bin, wie ich arbeite und warum mich Security und Schnittstellen faszinieren — mit Steckbrief und Foto."
/>

<div class="pt-16 md:pt-20">
	<Breadcrumbs label="Über mich" />
	<About />
	<RelatedLinks
		links={[
			{
				route: '/experience',
				label: 'Werdegang',
				description: 'Vom Elektroinstallateur EFZ zur Zweitausbildung als Informatiker.'
			},
			{
				route: '/skills',
				label: 'Skills & Technologien',
				description: 'Was ich aus beiden Ausbildungen mitbringe — ehrlich eingeschätzt.'
			},
			{
				route: '/contact',
				label: 'Kontakt',
				description: 'Direkt schreiben — per Formular, E-Mail oder Telefon.'
			}
		]}
	/>
</div>
