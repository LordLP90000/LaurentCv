<script lang="ts">
	import Hero from '$components/Hero.svelte';
	import About from '$components/About.svelte';
	import Timeline from '$components/Timeline.svelte';
	import Skills from '$components/Skills.svelte';
	import Projects from '$components/Projects.svelte';
	import Education from '$components/Education.svelte';
	import Contact from '$components/Contact.svelte';
	import { profile } from '$data/profile';

	let { form } = $props();

	const title = `${profile.name} · ${profile.title}`;
	const description = `Personal CV & Tech Lab von ${profile.name}. Informatiker in Ausbildung mit Fokus auf Security, Schnittstellen und saubere Software.`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content="de_CH" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<Hero />
<About />
<Timeline />
<Skills />
<Projects />
<Education />
<Contact {form} />
