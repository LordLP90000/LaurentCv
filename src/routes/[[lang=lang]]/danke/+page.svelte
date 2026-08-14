<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$components/Seo.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { responseTimePromise } from '$data/site';

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale].danke);
	const home = $derived(locale === 'en' ? '/en' : '/');
</script>

<Seo title={t.seoTitle} description={t.seoDescription} noindex />

<section class="flex min-h-[70svh] flex-col justify-center py-16">
	<p class="mb-5 font-mono text-xs tracking-[0.12em] text-copper">{t.eyebrow}</p>
	<h1 class="text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.1] font-bold tracking-[-0.025em]">
		{t.heading}
	</h1>
	<p class="mt-6 max-w-[560px] leading-[1.65] text-muted">
		{t.body}
		{responseTimePromise[locale]}
	</p>
	<div class="mt-10 flex flex-wrap gap-6 text-sm font-medium">
		<a href={home} class="border-b border-copper pb-0.5 text-copper">{t.home}</a>
		<a
			href={`${home}#a-projekte`}
			class="border-b border-line-strong pb-0.5 transition-colors hover:border-copper hover:text-copper"
		>
			{t.projects}
		</a>
	</div>
</section>
