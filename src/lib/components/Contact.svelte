<script lang="ts">
	import { page } from '$app/state';
	import Section from './Section.svelte';
	import Faq from './Faq.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { profile } from '$data/profile';
	import { responseTimePromise } from '$data/site';
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';

	interface Props {
		form?: { success?: boolean; error?: string; values?: Record<string, string> } | null;
	}

	let { form }: Props = $props();
	let submitting = $state(false);

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale].kontakt);
	const p = $derived(profile[locale]);

	const socials = $derived(p.social.filter((s) => s.icon === 'github' || s.icon === 'linkedin'));
	const inputClass =
		'border border-line bg-card px-3 py-2 text-base text-ink sm:text-sm focus:border-copper';
</script>

<Section id="a-kontakt" num="08" title={t.title}>
	<h3 class="text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.1] font-bold tracking-[-0.025em]">
		{t.heading}
	</h3>
	<p class="mt-5 max-w-[560px] leading-[1.65] text-muted">
		{t.lead}
		{responseTimePromise[locale]}
	</p>

	<div class="mt-9 flex flex-col gap-3.5">
		<a
			href="mailto:{p.email}"
			class="self-start border-b border-copper pb-1 font-mono text-lg break-all transition-colors hover:text-copper min-[900px]:text-[22px]"
		>
			{p.email}
		</a>
		<a
			href="tel:{p.phone.replace(/\s/g, '')}"
			class="self-start font-mono text-base text-muted transition-colors hover:text-copper"
		>
			{p.phone}
		</a>
	</div>

	<div class="mt-7 flex gap-6 text-sm font-medium">
		{#each socials as s (s.href)}
			<a
				href={s.href}
				target="_blank"
				rel="noreferrer"
				class="border-b border-line-strong pb-0.5 transition-colors hover:border-copper hover:text-copper"
			>
				{s.label} →
			</a>
		{/each}
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
		class="mt-16 flex max-w-[720px] flex-col gap-4 border border-line p-5 sm:p-6"
	>
		<h3 class="font-mono text-xs font-medium tracking-[0.1em]">{t.formTitle}</h3>
		<div class="grid gap-4 sm:grid-cols-2">
			<label class="flex flex-col gap-1 text-sm">
				<span class="font-mono text-[11px] tracking-[0.1em] text-muted">{t.nameLabel}</span>
				<input
					type="text"
					name="name"
					required
					minlength="2"
					value={form?.values?.name ?? ''}
					class={inputClass}
				/>
			</label>
			<label class="flex flex-col gap-1 text-sm">
				<span class="font-mono text-[11px] tracking-[0.1em] text-muted">{t.emailLabel}</span>
				<input
					type="email"
					name="email"
					required
					value={form?.values?.email ?? ''}
					class={inputClass}
				/>
			</label>
		</div>
		<label class="flex flex-col gap-1 text-sm">
			<span class="font-mono text-[11px] tracking-[0.1em] text-muted">{t.messageLabel}</span>
			<textarea name="message" required minlength="10" rows="5" class="resize-y {inputClass}"
				>{form?.values?.message ?? ''}</textarea
			>
		</label>

		{#if form?.error}
			<p class="border border-copper px-3 py-2 text-sm text-copper" role="alert">{form.error}</p>
		{/if}

		<button
			type="submit"
			disabled={submitting}
			class="self-start bg-copper px-5 py-3 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
		>
			{submitting ? t.submitting : t.submit}
		</button>
	</form>

	<Faq />

	<p class="mt-20 border-t border-line pt-5 font-mono text-[11px] tracking-[0.06em] text-muted">
		© 2026 LAURENT SCHERRER · MEGGEN CH ·
		<a href={resolve('/datenschutz')} class="transition-colors hover:text-copper">{t.privacy}</a> · BUILT
		WITH SVELTEKIT
	</p>
</Section>
