<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { sections } from '$data/navigation';
	import { profile } from '$data/profile';
	import ThemeToggle from './ThemeToggle.svelte';

	let active = $state('a-profil');
	let open = $state(false);

	const onHome = $derived(page.url.pathname === resolve('/'));
	const activeNum = $derived(sections.find((s) => s.id === active)?.num ?? '01');
	const firstName = profile.name.split(' ')[0];

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
		for (const s of sections) {
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
		return onHome ? `#${id}` : `${resolve('/')}#${id}`;
	}
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (open = false)} />

<!-- Desktop rail -->
<aside
	class="fixed inset-y-0 left-0 z-10 hidden w-[264px] flex-col gap-10 border-r border-line bg-paper px-7 py-9 min-[900px]:flex"
>
	<div>
		<p class="mb-3 font-mono text-[11px] tracking-[0.12em] text-muted">LEBENSLAUF / 2026</p>
		<a href={resolve('/')} class="text-xl font-semibold tracking-tight">{firstName} Scherrer</a>
		<p class="mt-1.5 text-[13px] leading-normal text-muted">
			Informatiker in Ausbildung<br />Elektroinstallateur EFZ
		</p>
	</div>

	<nav class="flex flex-col gap-0.5" aria-label="Index">
		{#each sections as s (s.id)}
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
		<ThemeToggle />
		<p class="font-mono text-[11px] leading-[1.8] text-muted">
			{profile.location}<br />{profile.citizenship} · * {profile.birthDate}
		</p>
	</div>
</aside>

<!-- Mobile top bar (stays above the overlay so INDEX/SCHLIESSEN keeps working) -->
<header
	class="fixed inset-x-0 top-0 z-40 flex items-center gap-3 border-b border-line bg-paper px-4 py-3 min-[900px]:hidden"
>
	<a href={resolve('/')} class="text-sm font-semibold tracking-tight">{firstName} Scherrer</a>
	{#if onHome}
		<span class="font-mono text-[11px] text-copper" aria-hidden="true">{activeNum}</span>
	{/if}
	<div class="ml-auto flex items-center gap-3">
		<ThemeToggle />
		<button
			type="button"
			aria-expanded={open}
			aria-label="Index umschalten"
			onclick={() => (open = !open)}
			class="py-1.5 font-mono text-[11px] tracking-[0.1em] text-ink transition-colors hover:text-copper"
		>
			{open ? 'SCHLIESSEN' : 'INDEX'}
		</button>
	</div>
</header>

{#if open}
	<nav
		class="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-paper px-5 pt-20 pb-10 min-[900px]:hidden"
		aria-label="Index"
	>
		{#each sections as s (s.id)}
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
			{profile.location} · {profile.citizenship}
		</p>
	</nav>
{/if}
