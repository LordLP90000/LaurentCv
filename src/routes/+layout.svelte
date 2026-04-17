<script lang="ts">
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import { reveal } from '$lib/actions/reveal';
	import './layout.css';

	let { children } = $props();
</script>

<Header />
<main use:reveal class="flex min-h-screen flex-col">
	{@render children()}
</main>
<Footer />
