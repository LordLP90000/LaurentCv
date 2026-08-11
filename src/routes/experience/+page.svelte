<script lang="ts">
	import Timeline from '$components/Timeline.svelte';
	import Seo from '$components/Seo.svelte';
	import Breadcrumbs from '$components/Breadcrumbs.svelte';
	import RelatedLinks from '$components/RelatedLinks.svelte';
</script>

<Seo
	title="Werdegang & Berufserfahrung · Laurent Scherrer"
	description="Mein Werdegang: vierjährige Lehre als Elektroinstallateur EFZ bei Frey & Cie, jetzt Zweitausbildung zum Applikationsentwickler bei der Komax AG in Dierikon."
/>

<div class="pt-16 md:pt-20">
	<Breadcrumbs label="Werdegang" />
	<Timeline />
	<RelatedLinks
		links={[
			{
				route: '/skills',
				label: 'Skills & Technologien',
				description: 'Welche Technologien und Fähigkeiten aus diesen Stationen entstanden sind.'
			},
			{
				route: '/education',
				label: 'Ausbildung & Zertifikate',
				description: 'Beide Lehren, Schulen und Zertifikate im Überblick.'
			}
		]}
	/>
</div>
