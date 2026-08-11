<script lang="ts">
	import Seo from '$components/Seo.svelte';
	import Breadcrumbs from '$components/Breadcrumbs.svelte';
	import Section from '$components/Section.svelte';
	import { profile } from '$data/profile';
</script>

<Seo
	title="Datenschutzerklärung · Laurent Scherrer"
	description="Datenschutzerklärung dieser Website: welche Daten beim Besuch, über das Kontaktformular und durch Analytics verarbeitet werden — und welche Rechte du hast."
/>

<div class="pt-16 md:pt-20">
	<Breadcrumbs label="Datenschutz" />

	<Section
		id="datenschutz"
		eyebrow="Rechtliches"
		title="Datenschutzerklärung."
		lead="Transparenz darüber, welche Daten diese Website verarbeitet — und warum."
	>
		<div class="flex max-w-3xl flex-col gap-10">
			<p
				class="rounded-xl border p-4 text-sm leading-relaxed"
				style:border-color="#f5a524"
				style:color="#f5a524"
			>
				[REVIEW — Platzhaltertext: Diese Datenschutzerklärung ist ein strukturierter Entwurf und
				muss vor Veröffentlichung durch geprüften Text aus einem Datenschutz-Generator oder von
				einer Fachperson ersetzt werden.]
			</p>

			<div class="flex flex-col gap-3">
				<h3 class="text-lg font-semibold">1. Verantwortliche Person</h3>
				<p class="text-sm leading-relaxed" style:color="var(--text-muted)">
					{profile.name}<br />
					[PLACEHOLDER — Postadresse]<br />
					E-Mail: {profile.email}
				</p>
			</div>

			<div class="flex flex-col gap-3">
				<h3 class="text-lg font-semibold">2. Hosting</h3>
				<p class="text-sm leading-relaxed" style:color="var(--text-muted)">
					Diese Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf der Seite verarbeitet
					Vercel technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit des Zugriffs,
					Browser-Typ und aufgerufene Seite (Server-Logs). Diese Daten sind für den sicheren Betrieb
					der Website erforderlich. [REVIEW — Aufbewahrungsdauer und Details gemäss Vercel-DPA
					ergänzen.]
				</p>
			</div>

			<div class="flex flex-col gap-3">
				<h3 class="text-lg font-semibold">3. Kontaktformular</h3>
				<p class="text-sm leading-relaxed" style:color="var(--text-muted)">
					Wenn du das Kontaktformular nutzt, werden die von dir angegebenen Daten (Name,
					E-Mail-Adresse, Nachricht) per E-Mail-Dienstleister an mich übermittelt und
					ausschliesslich zur Beantwortung deiner Anfrage verwendet. Die Daten werden nicht an
					Dritte weitergegeben. [REVIEW — E-Mail-Dienstleister benennen, Speicherdauer und
					Löschkonzept ergänzen.]
				</p>
			</div>

			<div class="flex flex-col gap-3">
				<h3 class="text-lg font-semibold">4. Cookies & Local Storage</h3>
				<p class="text-sm leading-relaxed" style:color="var(--text-muted)">
					Diese Website verwendet keine Tracking-Cookies ohne deine Einwilligung. Im Local Storage
					deines Browsers werden lediglich funktionale Einstellungen gespeichert: dein gewähltes
					Farbschema (hell/dunkel) und deine Entscheidung zur Analytics-Einwilligung. Diese Daten
					verlassen deinen Browser nicht.
				</p>
			</div>

			<div class="flex flex-col gap-3">
				<h3 class="text-lg font-semibold">5. Webanalyse (Google Analytics 4)</h3>
				<p class="text-sm leading-relaxed" style:color="var(--text-muted)">
					Nur wenn du über das Cookie-Banner einwilligst, wird Google Analytics 4 (Google LLC, USA)
					geladen, um die Nutzung der Website anonymisiert auszuwerten. Ohne Einwilligung wird kein
					Analytics-Skript geladen und keine Daten an Google übertragen. Du kannst deine
					Einwilligung jederzeit widerrufen, indem du den Local Storage deines Browsers leerst.
					[REVIEW — Google-Analytics-Abschnitt aus Datenschutz-Generator übernehmen, inkl. Hinweis
					auf Drittlandtransfer USA.]
				</p>
			</div>

			<div class="flex flex-col gap-3">
				<h3 class="text-lg font-semibold">6. Deine Rechte</h3>
				<p class="text-sm leading-relaxed" style:color="var(--text-muted)">
					Nach dem Schweizer Datenschutzgesetz (nDSG) und — soweit anwendbar — der DSGVO hast du das
					Recht auf Auskunft, Berichtigung und Löschung deiner Personendaten. Melde dich dazu
					einfach per E-Mail. [REVIEW — Abschnitt zu Beschwerderecht bei Aufsichtsbehörde (EDÖB)
					ergänzen.]
				</p>
			</div>

			<p class="text-xs" style:color="var(--text-muted)">
				Stand: [PLACEHOLDER — Datum der letzten Aktualisierung]
			</p>
		</div>
	</Section>
</div>
