<script lang="ts">
	import { profile } from '$data/profile';
	import { hobbies } from '$data/interests';
	import Section from './Section.svelte';

	const facts = [
		{ label: 'Standort', value: profile.location },
		{ label: 'Alter', value: `${new Date().getFullYear() - 2005} Jahre` },
		{ label: 'Sprachen', value: 'DE · IT · EN · FR' },
		{ label: 'Rolle', value: 'Informatik-Lernender · 2. LJ' }
	];
</script>

<Section
	id="about"
	eyebrow="Über mich"
	title="Zwei Ausbildungen, ein Ziel: verstehen, wie Dinge wirklich funktionieren."
>
	<div class="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
		<div class="flex flex-col gap-6">
			<div
				class="relative aspect-square overflow-hidden rounded-2xl border"
				style:border-color="var(--border)"
				style:background="var(--surface-muted)"
			>
				<div
					class="flex h-full w-full items-center justify-center text-6xl font-semibold"
					style:background="linear-gradient(135deg, var(--accent-soft), transparent)"
					style:color="var(--accent)"
					aria-hidden="true"
				>
					LS
				</div>
				<span class="absolute bottom-3 left-3 rounded-md border px-2 py-1 text-xs"
					style:border-color="var(--border)"
					style:background="var(--surface-elevated)"
					style:color="var(--text-muted)"
				>
					Foto folgt
				</span>
			</div>

			<dl class="grid grid-cols-2 gap-3 text-sm">
				{#each facts as f (f.label)}
					<div
						class="rounded-lg border p-3"
						style:border-color="var(--border)"
						style:background="var(--surface-muted)"
					>
						<dt class="text-xs tracking-wider uppercase" style:color="var(--text-muted)">
							{f.label}
						</dt>
						<dd class="mt-1 font-medium">{f.value}</dd>
					</div>
				{/each}
			</dl>
		</div>

		<div class="flex flex-col gap-6">
			<p class="text-base leading-relaxed md:text-lg">
				{profile.bio}
			</p>

			<div>
				<h3 class="mb-3 text-sm font-semibold tracking-wider uppercase" style:color="var(--text-muted)">
					Abseits des Bildschirms
				</h3>
				<ul class="flex flex-wrap gap-2">
					{#each hobbies as hobby (hobby)}
						<li
							class="rounded-full border px-3 py-1 text-sm"
							style:border-color="var(--border)"
							style:background="var(--surface-muted)"
						>
							{hobby}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</Section>
