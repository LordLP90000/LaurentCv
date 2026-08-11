<script lang="ts">
	import { profile } from '$data/profile';
	import { resolve } from '$app/paths';
	const year = new Date().getFullYear();
</script>

<footer
	class="mt-24 border-t"
	style:border-color="var(--border)"
	style:background="var(--surface-muted)"
>
	<div
		class="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 md:flex-row md:items-center md:px-6"
	>
		<div class="flex flex-col gap-1">
			<span class="font-semibold">{profile.name}</span>
			<span class="text-sm" style:color="var(--text-muted)">
				{profile.title}
			</span>
		</div>

		<nav
			class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
			style:color="var(--text-muted)"
		>
			{#each profile.social as s (s.href)}
				<a href={s.href} class="transition-colors hover:text-[var(--accent)]">{s.label}</a>
			{/each}
		</nav>

		<span class="flex flex-wrap items-center gap-x-3 text-xs" style:color="var(--text-muted)">
			<a href={resolve('/datenschutz')} class="transition-colors hover:text-[var(--accent)]">
				Datenschutz
			</a>
			<span aria-hidden="true">·</span>
			<span>© {year} · Built with SvelteKit</span>
		</span>
	</div>
</footer>
