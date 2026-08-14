<script lang="ts">
	import Hero from '$components/Hero.svelte';
	import Timeline from '$components/Timeline.svelte';
	import Skills from '$components/Skills.svelte';
	import Projects from '$components/Projects.svelte';
	import Education from '$components/Education.svelte';
	import Lab from '$components/Lab.svelte';
	import Notes from '$components/Notes.svelte';
	import Contact from '$components/Contact.svelte';
	import Seo from '$components/Seo.svelte';
	import JsonLd from '$components/JsonLd.svelte';
	import { page } from '$app/state';
	import { profile } from '$data/profile';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	const personSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: profile.name,
		jobTitle: 'Informatiker in Ausbildung',
		url: page.url.origin,
		image: `${page.url.origin}/profile.jpeg`,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Meggen',
			addressCountry: 'CH'
		},
		sameAs: profile.social
			.filter((s) => s.icon === 'github' || s.icon === 'linkedin')
			.map((s) => s.href)
	});
</script>

<Seo
	title={`${profile.name.split(' ')[0]} Scherrer · Informatiker in Ausbildung · CV`}
	description="Persönlicher CV & Tech Lab von Laurent Scherrer — Informatiker in Ausbildung mit Elektro-Background. Fokus auf IT-Security, Algorithmen und Schnittstellen."
	type="profile"
/>
<JsonLd data={personSchema} />

<Hero />
<Timeline />
<Skills />
<Projects />
<Education />
<Lab />
<Notes />
<Contact {form} />
