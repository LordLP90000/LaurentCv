<script lang="ts">
	import { profile } from '$data/profile';

	let index = $state(0);
	let visible = $state(true);

	$effect(() => {
		const interval = setInterval(() => {
			visible = false;
			setTimeout(() => {
				index = (index + 1) % profile.tagline.length;
				visible = true;
			}, 250);
		}, 3500);
		return () => clearInterval(interval);
	});
</script>

<section
	class="relative mx-auto flex min-h-[92vh] w-full max-w-6xl flex-col justify-center px-4 pt-32 pb-16 md:px-6"
>
	<p class="mb-4 text-sm font-medium tracking-[0.25em] uppercase" style:color="var(--accent)">
		Hi, ich bin
	</p>
	<h1 class="text-5xl font-semibold tracking-tight md:text-7xl">
		{profile.name.split(' ')[0]}
		<span
			class="bg-clip-text text-transparent"
			style:background-image="linear-gradient(135deg, var(--accent), var(--highlight))"
		>
			Scherrer.
		</span>
	</h1>

	<p
		class="mt-6 max-w-2xl text-lg md:text-xl"
		style:color="var(--text-muted)"
	>
		{profile.title}
	</p>

	<div class="mt-8 h-8 font-mono text-sm md:text-base" aria-live="polite">
		<span
			class="inline-block transition-all duration-300"
			style:opacity={visible ? 1 : 0}
			style:transform={visible ? 'translateY(0)' : 'translateY(4px)'}
			style:color="var(--highlight)"
		>
			<span style:color="var(--text-muted)">$</span> {profile.tagline[index]}
		</span>
	</div>

	<div class="mt-12 flex flex-wrap gap-3">
		<a
			href="#contact"
			class="rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[var(--ring)] transition-transform hover:-translate-y-0.5"
			style:background="var(--accent)"
		>
			Kontakt aufnehmen
		</a>
		<a
			href="#projects"
			class="rounded-lg border px-5 py-3 text-sm font-medium transition-colors hover:text-[var(--accent)]"
			style:border-color="var(--border)"
		>
			Projekte ansehen
		</a>
	</div>

	<div class="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" style:color="var(--text-muted)">
		<span class="flex items-center gap-2">
			<span class="h-2 w-2 rounded-full" style:background="var(--highlight)"></span>
			{profile.location}
		</span>
		<span>·</span>
		<span>{profile.citizenship}</span>
		<span>·</span>
		<span>* {profile.birthDate}</span>
	</div>
</section>
