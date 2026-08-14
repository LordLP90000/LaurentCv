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
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale]);
	const p = $derived(profile[locale]);

	const personSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: p.name,
		jobTitle: t.jobTitle,
		url: `${page.url.origin}${locale === 'en' ? '/en' : '/'}`,
		image: `${page.url.origin}/profile.jpeg`,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Meggen',
			addressCountry: 'CH'
		},
		sameAs: p.social.filter((s) => s.icon === 'github' || s.icon === 'linkedin').map((s) => s.href)
	});
</script>

<Seo
	title={t.seo.title}
	description={t.seo.description}
	type="profile"
	alternates={{ de: '/', en: '/en' }}
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
