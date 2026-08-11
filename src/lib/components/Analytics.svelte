<script lang="ts">
	import { browser } from '$app/environment';
	import { env } from '$env/dynamic/public';
	import { afterNavigate } from '$app/navigation';
	import { consent } from '$lib/stores/consent.svelte';

	const gaId = env.PUBLIC_GA_ID;

	function loadGa(id: string) {
		if (document.getElementById('ga4-script')) return;

		window.dataLayer = window.dataLayer ?? [];
		window.gtag = function gtag() {
			// GA expects the actual `arguments` object, not a spread copy.
			window.dataLayer.push(arguments);
		};
		window.gtag('js', new Date());
		window.gtag('config', id, { anonymize_ip: true });

		const script = document.createElement('script');
		script.id = 'ga4-script';
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
		document.head.appendChild(script);
	}

	// Loads GA only once consent is granted — nothing is requested before.
	$effect(() => {
		if (consent.value === 'granted' && gaId) {
			loadGa(gaId);
		}
	});

	// The SvelteKit router swaps pages client-side, so report page views manually.
	afterNavigate((navigation) => {
		if (navigation.type === 'enter') return; // initial load is tracked by `config`
		if (browser && consent.value === 'granted' && gaId && typeof window.gtag === 'function') {
			window.gtag('event', 'page_view', {
				page_location: window.location.href,
				page_title: document.title
			});
		}
	});
</script>
