<script lang="ts">
	import { primaryNav, type NavItem } from '$data/navigation';
	import { profile } from '$data/profile';
	import { resolve } from '$app/paths';
	import ThemeToggle from './ThemeToggle.svelte';

	function href(item: NavItem) {
		const base = resolve(item.route);
		return item.hash ? `${base}#${item.hash}` : base;
	}

	let scrolled = $state(false);
	let open = $state(false);

	function onScroll() {
		scrolled = window.scrollY > 8;
	}

	$effect(() => {
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const nameParts = profile.name.split(' ');
	const initials = (nameParts[0]?.[0] ?? '') + (nameParts[nameParts.length - 1]?.[0] ?? '');
</script>

<header
	class="fixed top-0 left-0 z-40 w-full backdrop-blur transition-[background,border,box-shadow] duration-300"
	class:bg-[var(--surface-muted)]={scrolled}
	class:border-b={scrolled}
	class:shadow-sm={scrolled}
	style:border-color="var(--border)"
>
	<div class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
		<a href={resolve('/')} class="flex items-center gap-2 font-semibold tracking-tight">
			<span
				class="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white"
				style:background="linear-gradient(135deg, var(--accent), var(--highlight))"
			>
				{initials}
			</span>
			<span class="hidden sm:inline">{profile.name.split(' ')[0]} Scherrer</span>
		</a>

		<nav class="ml-auto hidden items-center gap-1 text-sm md:flex">
			{#each primaryNav as item (item.label)}
				<a
					href={href(item)}
					class="rounded-md px-3 py-2 transition-colors hover:text-[var(--accent)]"
					style:color="var(--text-muted)"
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="ml-auto flex items-center gap-2 md:ml-2">
			<ThemeToggle />
			<button
				class="rounded-md p-2 md:hidden"
				style:color="var(--text-muted)"
				aria-label="Menü umschalten"
				aria-expanded={open}
				onclick={() => (open = !open)}
			>
				{#if open}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
						><path d="M6 6l12 12M6 18L18 6" stroke-width="2" stroke-linecap="round" /></svg
					>
				{:else}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
						><path d="M4 7h16M4 12h16M4 17h16" stroke-width="2" stroke-linecap="round" /></svg
					>
				{/if}
			</button>
		</div>
	</div>

	{#if open}
		<nav
			class="border-t md:hidden"
			style:border-color="var(--border)"
			style:background="var(--surface-muted)"
		>
			<ul class="mx-auto flex max-w-6xl flex-col px-4 py-2">
				{#each primaryNav as item (item.label)}
					<li class="border-b last:border-b-0" style:border-color="var(--border)">
						<a
							href={href(item)}
							class="block rounded-md px-2 py-4 text-base"
							style:color="var(--text)"
							onclick={() => (open = false)}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>
