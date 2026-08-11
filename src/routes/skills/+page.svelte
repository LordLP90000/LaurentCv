<script lang="ts">
	import Skills from '$components/Skills.svelte';
	import Seo from '$components/Seo.svelte';
	import Breadcrumbs from '$components/Breadcrumbs.svelte';
	import RelatedLinks from '$components/RelatedLinks.svelte';
</script>

<Seo
	title="Skills & Technologien · Laurent Scherrer, Informatiker"
	description="Skills aus zwei Ausbildungen: C#, .NET, TypeScript, SvelteKit und Elektrotechnik — ehrlich eingeschätzt nach der Skala aus meinem offiziellen Lebenslauf."
/>

<div class="pt-16 md:pt-20">
	<Breadcrumbs label="Skills" />
	<Skills />
	<RelatedLinks
		links={[
			{
				route: '/projects',
				label: 'Projekte',
				description: 'Diese Skills in Aktion — Projekte mit Stack und Status.'
			},
			{
				route: '/experience',
				label: 'Werdegang',
				description: 'Wo und wie diese Fähigkeiten entstanden sind.'
			}
		]}
	/>
</div>
