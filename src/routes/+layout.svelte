<script lang="ts">
	import Sidebar from '$components/Sidebar.svelte';
	import CookieConsent from '$components/CookieConsent.svelte';
	import Analytics from '$components/Analytics.svelte';
	import { reveal } from '$lib/actions/reveal';
	import './layout.css';

	let { children } = $props();
</script>

<Sidebar />
<main
	use:reveal
	class="px-5 pt-16 pb-16 min-[900px]:ml-[264px] min-[900px]:px-16 min-[900px]:pt-0 min-[900px]:pb-24"
>
	<div class="w-full max-w-[920px]">
		{@render children()}
	</div>
</main>
<CookieConsent />
<Analytics />
