<script lang="ts">
	import { page } from '$app/state';
	import { localeOf, type Locale } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { sections } from '$data/navigation';
	import { profile } from '$data/profile';
	import ThemeToggle from './ThemeToggle.svelte';

	let active = $state('a-profil');
	let open = $state(false);

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale].sidebar);
	const nav = $derived(sections[locale]);
	const p = $derived(profile[locale]);
	const onHome = $derived(page.url.pathname === '/' || page.url.pathname === '/en');
	const activeNum = $derived(nav.find((s) => s.id === active)?.num ?? '01');
	const firstName = profile.de.name.split(' ')[0];
	const homePath = $derived(locale === 'en' ? '/en' : '/');

	$effect(() => {
		if (!onHome) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) active = entry.target.id;
				}
			},
			{ rootMargin: '-30% 0px -60% 0px' }
		);
		for (const s of nav) {
			const el = document.getElementById(s.id);
			if (el) io.observe(el);
		}
		return () => io.disconnect();
	});

	$effect(() => {
		document.body.classList.toggle('overflow-hidden', open);
		return () => document.body.classList.remove('overflow-hidden');
	});

	function href(id: string) {
		return onHome ? `#${id}` : `${locale === 'en' ? '/en' : '/'}#${id}`;
	}

	function langHref(target: Locale) {
		const home = target === 'en' ? '/en' : '/';
		const path = page.url.pathname;
		if (path === '/danke' || path === '/en/danke') {
			return target === 'en' ? '/en/danke' : '/danke';
		}
		if (onHome) return `${home}#${active}`;
		return home;
	}
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (open = false)} />

<!-- Desktop rail -->
<aside
	class="fixed inset-y-0 left-0 z-10 hidden w-[264px] flex-col gap-10 border-r border-line bg-paper px-7 py-9 min-[900px]:flex"
>
	<div>
		<p class="mb-3 font-mono text-[11px] tracking-[0.12em] text-muted">{t.eyebrow}</p>
		<a href={homePath} class="text-xl font-semibold tracking-tight">{firstName} Scherrer</a>
		<p class="mt-1.5 text-[13px] leading-normal text-muted">
			{t.role1}<br />{t.role2}
		</p>
	</div>

	<nav class="flex flex-col gap-0.5" aria-label={t.navLabel}>
		{#each nav as s (s.id)}
			<a
				href={href(s.id)}
				aria-current={onHome && active === s.id ? 'true' : undefined}
				class="-mx-2.5 flex items-baseline gap-3 px-2.5 py-2 font-mono text-xs tracking-[0.06em] transition-colors {onHome &&
				active === s.id
					? 'bg-copper-soft text-copper'
					: 'text-muted hover:text-copper'}"
			>
				<span class="text-[11px] opacity-70">{s.num}</span>
				<span>{s.label}</span>
			</a>
		{/each}
	</nav>

	<div class="mt-auto flex flex-col gap-4">
		<div class="flex items-center gap-2">
			<ThemeToggle />
			<div
				class="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em]"
				aria-label={t.langLabel}
			>
				<a
					href={langHref('de')}
					aria-current={locale === 'de' ? 'true' : undefined}
					class={locale === 'de' ? 'text-copper' : 'text-muted transition-colors hover:text-copper'}
					>DE</a
				>
				<span class="text-line-strong" aria-hidden="true">|</span>
				<a
					href={langHref('en')}
					aria-current={locale === 'en' ? 'true' : undefined}
					class={locale === 'en' ? 'text-copper' : 'text-muted transition-colors hover:text-copper'}
					>EN</a
				>
			</div>
		</div>
		<p class="font-mono text-[11px] leading-[1.8] text-muted">
			{p.location}<br />{p.citizenship} · * {p.birthDate}
		</p>
	</div>
</aside>

<!-- Mobile top bar (stays above the overlay so INDEX/SCHLIESSEN keeps working) -->
<header
	class="fixed inset-x-0 top-0 z-40 flex items-center gap-3 border-b border-line bg-paper px-4 py-3 min-[900px]:hidden"
>
	<a href={homePath} class="text-sm font-semibold tracking-tight">{firstName} Scherrer</a>
	{#if onHome}
		<span class="font-mono text-[11px] text-copper" aria-hidden="true">{activeNum}</span>
	{/if}
	<div class="ml-auto flex items-center gap-3">
		<ThemeToggle />
		<div
			class="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em]"
			aria-label={t.langLabel}
		>
			<a
				href={langHref('de')}
				aria-current={locale === 'de' ? 'true' : undefined}
				class={locale === 'de' ? 'text-copper' : 'text-muted transition-colors hover:text-copper'}
				>DE</a
			>
			<span class="text-line-strong" aria-hidden="true">|</span>
			<a
				href={langHref('en')}
				aria-current={locale === 'en' ? 'true' : undefined}
				class={locale === 'en' ? 'text-copper' : 'text-muted transition-colors hover:text-copper'}
				>EN</a
			>
		</div>
		<button
			type="button"
			aria-expanded={open}
			aria-label={t.indexToggleLabel}
			onclick={() => (open = !open)}
			class="py-1.5 font-mono text-[11px] tracking-[0.1em] text-ink transition-colors hover:text-copper"
		>
			{open ? t.close : t.index}
		</button>
	</div>
</header>

{#if open}
	<nav
		class="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-paper px-5 pt-20 pb-10 min-[900px]:hidden"
		aria-label={t.navLabel}
	>
		{#each nav as s (s.id)}
			<a
				href={href(s.id)}
				onclick={() => (open = false)}
				class="flex items-baseline gap-4 border-b border-line py-4 font-mono text-sm tracking-[0.06em] {onHome &&
				active === s.id
					? 'text-copper'
					: 'text-ink'}"
			>
				<span class="text-xs text-muted">{s.num}</span>
				<span>{s.label}</span>
			</a>
		{/each}
		<p class="mt-auto pt-10 font-mono text-[11px] text-muted">
			{p.location} · {p.citizenship}
		</p>
	</nav>
{/if}
