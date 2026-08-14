<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$components/Seo.svelte';
	import { ui } from '$data/ui';

	const locale = $derived(
		page.url.pathname === '/en' || page.url.pathname.startsWith('/en/') ? 'en' : 'de'
	);
	const t = $derived(ui[locale].error);
	const home = $derived(locale === 'en' ? '/en' : '/');
	const isNotFound = $derived(page.status === 404);
	const title = $derived(isNotFound ? t.notFoundTitle : t.errorTitle);
</script>

<Seo {title} description={t.seoDescription} noindex />

<section class="flex min-h-[70svh] flex-col justify-center py-16">
	<p class="mb-5 font-mono text-xs tracking-[0.12em] text-copper">{t.eyebrow} — {page.status}</p>
	<h1 class="text-[clamp(3rem,10vw,5.5rem)] leading-none font-bold tracking-[-0.035em]">
		{page.status}
	</h1>
	<p class="mt-6 max-w-[560px] leading-[1.65] text-muted">
		{isNotFound ? t.notFoundBody : t.otherBody}
	</p>
	<div class="mt-10 flex flex-wrap gap-6 text-sm font-medium">
		<a href={home} class="border-b border-copper pb-0.5 text-copper">{t.home}</a>
		<a
			href={`${home}#a-kontakt`}
			class="border-b border-line-strong pb-0.5 transition-colors hover:border-copper hover:text-copper"
		>
			{t.contact}
		</a>
	</div>
</section>
