<script lang="ts">
	import { profile } from '$data/profile';
	import Section from './Section.svelte';
	import { enhance } from '$app/forms';

	interface Props {
		form?: { success?: boolean; error?: string; values?: Record<string, string> } | null;
	}

	let { form }: Props = $props();

	let submitting = $state(false);
</script>

<Section
	id="contact"
	eyebrow="Kontakt"
	title="Lass uns reden."
	lead="Ob Praktikum, Security-Projekt oder ein Austausch über Schnittstellen — schreib mir."
>
	<div class="grid gap-10 md:grid-cols-[1fr_1fr]">
		<div class="flex flex-col gap-4">
			<a
				href="mailto:{profile.email}"
				class="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:text-[var(--accent)]"
				style:border-color="var(--border)"
				style:background="var(--surface-muted)"
			>
				<span
					class="flex h-10 w-10 items-center justify-center rounded-lg"
					style:background="var(--accent-soft)"
					style:color="var(--accent)"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<rect x="3" y="5" width="18" height="14" rx="2" />
						<path d="M3 7l9 6 9-6" />
					</svg>
				</span>
				<div class="flex flex-col">
					<span class="text-xs tracking-wider uppercase" style:color="var(--text-muted)">E-Mail</span>
					<span class="font-medium">{profile.email}</span>
				</div>
			</a>

			<a
				href="tel:{profile.phone.replace(/\s/g, '')}"
				class="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:text-[var(--accent)]"
				style:border-color="var(--border)"
				style:background="var(--surface-muted)"
			>
				<span
					class="flex h-10 w-10 items-center justify-center rounded-lg"
					style:background="var(--accent-soft)"
					style:color="var(--accent)"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.87 19.87 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.87 19.87 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
					</svg>
				</span>
				<div class="flex flex-col">
					<span class="text-xs tracking-wider uppercase" style:color="var(--text-muted)">Telefon</span>
					<span class="font-medium">{profile.phone}</span>
				</div>
			</a>

			<div class="flex flex-wrap gap-3 pt-2">
				{#each profile.social.filter((s) => s.icon === 'github' || s.icon === 'linkedin') as s (s.href)}
					<a
						href={s.href}
						target="_blank"
						rel="noreferrer"
						class="rounded-lg border px-4 py-2 text-sm transition-colors hover:text-[var(--accent)]"
						style:border-color="var(--border)"
					>
						{s.label}
					</a>
				{/each}
			</div>
		</div>

		<form
			method="POST"
			action="?/contact"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					await update();
					submitting = false;
				};
			}}
			class="flex flex-col gap-4 rounded-2xl border p-6"
			style:border-color="var(--border)"
			style:background="var(--surface-muted)"
		>
			<div class="grid gap-4 sm:grid-cols-2">
				<label class="flex flex-col gap-1 text-sm">
					<span style:color="var(--text-muted)">Name</span>
					<input
						type="text"
						name="name"
						required
						minlength="2"
						value={form?.values?.name ?? ''}
						class="rounded-md border px-3 py-2 text-sm"
						style:border-color="var(--border)"
						style:background="var(--surface)"
					/>
				</label>
				<label class="flex flex-col gap-1 text-sm">
					<span style:color="var(--text-muted)">E-Mail</span>
					<input
						type="email"
						name="email"
						required
						value={form?.values?.email ?? ''}
						class="rounded-md border px-3 py-2 text-sm"
						style:border-color="var(--border)"
						style:background="var(--surface)"
					/>
				</label>
			</div>

			<label class="flex flex-col gap-1 text-sm">
				<span style:color="var(--text-muted)">Nachricht</span>
				<textarea
					name="message"
					required
					minlength="10"
					rows="5"
					class="resize-y rounded-md border px-3 py-2 text-sm"
					style:border-color="var(--border)"
					style:background="var(--surface)">{form?.values?.message ?? ''}</textarea>
			</label>

			{#if form?.success}
				<p class="rounded-md border px-3 py-2 text-sm" style:border-color="var(--highlight)" style:color="var(--highlight)">
					Danke! Deine Nachricht ist angekommen — ich melde mich bald.
				</p>
			{:else if form?.error}
				<p class="rounded-md border px-3 py-2 text-sm" style:border-color="#f87171" style:color="#f87171">
					{form.error}
				</p>
			{/if}

			<button
				type="submit"
				disabled={submitting}
				class="rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[var(--ring)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
				style:background="var(--accent)"
			>
				{submitting ? 'Senden …' : 'Nachricht senden'}
			</button>
		</form>
	</div>
</Section>
