<script lang="ts">
	import Projects from '$components/Projects.svelte';
	import Seo from '$components/Seo.svelte';
	import Breadcrumbs from '$components/Breadcrumbs.svelte';
	import RelatedLinks from '$components/RelatedLinks.svelte';
</script>

<Seo
	title="Projekte — SvelteKit, Security & mehr · Laurent Scherrer"
	description="Projekte von Laurent Scherrer: Living CV mit SvelteKit, HudlScan und weitere Experimente — mit Stack, Status und Links zu den GitHub-Repositories."
/>

<div class="pt-16 md:pt-20">
	<Breadcrumbs label="Projekte" />
	<Projects />
	<RelatedLinks
		links={[
			{
				route: '/lab',
				label: 'Tech Lab',
				description: 'Prototypen und Experimente, die noch nicht produktionsreif sind.'
			},
			{
				route: '/contact',
				label: 'Kontakt',
				description: 'Interesse an einem Projekt oder einer Zusammenarbeit? Schreib mir.'
			}
		]}
	/>
</div>
