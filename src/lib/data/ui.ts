import type { Locale } from '$lib/i18n';
import type { Project } from '$data/projects';
import type { Education } from '$data/education';
import type { LabExperiment } from '$data/lab';

const de = {
	jobTitle: 'Informatiker in Ausbildung',
	seo: {
		title: 'Laurent Scherrer · Informatiker in Ausbildung · CV',
		description:
			'Persönlicher CV & Tech Lab von Laurent Scherrer — Informatiker in Ausbildung mit Elektro-Background. Fokus auf IT-Security, Algorithmen und Schnittstellen.'
	},
	sidebar: {
		eyebrow: 'LEBENSLAUF / 2026',
		role1: 'Informatiker in Ausbildung',
		role2: 'Elektroinstallateur EFZ',
		index: 'INDEX',
		close: 'SCHLIESSEN',
		navLabel: 'Index',
		indexToggleLabel: 'Index umschalten',
		langLabel: 'Sprache wechseln'
	},
	theme: { dark: 'MODUS: DUNKEL', light: 'MODUS: HELL', label: 'Farbschema wechseln' },
	profil: {
		title: 'Profil',
		headline1: 'Strom verstanden.',
		headline2: 'Jetzt Code.',
		intro:
			'Vier Jahre Elektroinstallation, jetzt Zweitausbildung zum Informatiker bei der Komax AG. Mein besonderes Interesse gilt IT-Security, Algorithmen und der Kommunikation zwischen Systemen.',
		specName: 'NAME',
		specLocation: 'STANDORT',
		specBirthYear: 'JAHRGANG',
		specNationality: 'NATIONALITÄT',
		specLanguages: 'SPRACHEN',
		specStatus: 'STATUS',
		languagesValue: 'DE · IT · EN · FR',
		statusValue: 'Informatik-Lernender, 3. Lehrjahr · Komax AG',
		portraitAlt: 'Porträt von Laurent Scherrer',
		portraitCaption: 'ABB. 1 — SCHERRER, LAURENT LUCIEN',
		offWork: 'AUSSERHALB DES BÜROS'
	},
	werdegang: { title: 'Werdegang' },
	skills: {
		title: 'Skills',
		lead: 'Skills aus beiden Ausbildungen. Die Levels folgen der Skala aus meinem offiziellen Lebenslauf — L1 Grundkenntnisse bis L5 Experte.',
		languagesTitle: 'SPRACHEN',
		interestsTitle: 'INTERESSENSCHWERPUNKTE'
	},
	projekte: {
		title: 'Projekte',
		lead: 'Kein poliertes Portfolio-Grid, sondern die Werkbank: Dinge, an denen ich gerade arbeite.',
		status: {
			'in-progress': 'IN ARBEIT',
			live: 'LIVE',
			archived: 'ARCHIVIERT',
			concept: 'KONZEPT'
		} as Record<Project['status'], string>,
		linkText: (label: string) => `${label} ansehen →`
	},
	ausbildung: {
		title: 'Ausbildung',
		type: {
			apprenticeship: 'LEHRE',
			school: 'SCHULE',
			certification: 'ZERTIFIKAT'
		} as Record<Education['type'], string>
	},
	lab: {
		title: 'Lab',
		lead: 'Werkstatt für Halbfertiges — Prototypen, die noch nicht produktionsreif sind, aber etwas erzählen.',
		state: {
			geplant: 'GEPLANT',
			skizziert: 'SKIZZIERT',
			bald: 'BALD'
		} as Record<LabExperiment['state'], string>,
		footnote: 'DIESE SEITE WÄCHST MIT — NEUE EXPERIMENTE, KEIN UI-REFACTORING.'
	},
	notes: {
		title: 'Notes',
		lead: 'Kurze Write-ups zu Themen, mit denen ich mich gerade beschäftige. Noch in Vorbereitung — Inhalte folgen.',
		draft: 'DRAFT',
		dateLocale: 'de-CH'
	},
	kontakt: {
		title: 'Kontakt',
		heading: 'Lass uns reden.',
		lead: 'Ob Praktikum, Security-Projekt oder ein Austausch über Schnittstellen — schreib mir.',
		formTitle: 'NACHRICHT SENDEN',
		nameLabel: 'NAME',
		emailLabel: 'E-MAIL',
		messageLabel: 'NACHRICHT',
		submit: 'Nachricht senden',
		submitting: 'Senden …',
		faqTitle: 'HÄUFIGE FRAGEN',
		privacy: 'DATENSCHUTZ'
	},
	formErrors: {
		name: 'Bitte gib deinen Namen an.',
		email: 'Bitte gib eine gültige E-Mail-Adresse an.',
		message: 'Die Nachricht ist zu kurz.',
		server: 'Der Server ist nicht korrekt konfiguriert.',
		send: 'Die Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut.'
	},
	cookie: {
		label: 'Cookie-Hinweis',
		text: 'Ich würde gerne mit Google Analytics verstehen, wie diese Seite genutzt wird — aber nur mit deinem Einverständnis. Ohne Zustimmung wird nichts geladen.',
		more: 'Mehr dazu in der Datenschutzerklärung.',
		decline: 'Ablehnen',
		accept: 'Einverstanden'
	},
	danke: {
		seoTitle: 'Danke für deine Nachricht · Laurent Scherrer',
		seoDescription: 'Deine Nachricht ist angekommen — ich melde mich so schnell wie möglich.',
		eyebrow: 'STATUS — ZUGESTELLT ✓',
		heading: 'Danke — deine Nachricht ist angekommen.',
		body: 'So geht es weiter: Ich lese jede Nachricht persönlich und melde mich per E-Mail bei dir. Du musst nichts weiter tun.',
		home: 'Zur Startseite →',
		projects: 'Projekte ansehen →'
	},
	error: {
		notFoundTitle: 'Seite nicht gefunden · Laurent Scherrer',
		errorTitle: 'Fehler · Laurent Scherrer',
		seoDescription:
			'Diese Seite existiert nicht (mehr). Zurück zur Startseite oder direkt Kontakt aufnehmen.',
		eyebrow: 'FEHLER',
		notFoundBody:
			"Diese Seite gibt es nicht — vielleicht ein Tippfehler in der URL, vielleicht habe ich sie umgebaut. Kein Problem: Von hier aus geht's weiter.",
		otherBody:
			'Da ist etwas schiefgelaufen. Versuch es später noch einmal — oder sag mir kurz Bescheid.',
		home: 'Zur Startseite →',
		contact: 'Kontakt →'
	}
};

export type UiStrings = typeof de;

const en: UiStrings = {
	jobTitle: 'IT apprentice (software development)',
	seo: {
		title: 'Laurent Scherrer · IT Apprentice · CV',
		description:
			'Personal CV & tech lab of Laurent Scherrer — IT apprentice with an electrical background. Focused on IT security, algorithms and interfaces.'
	},
	sidebar: {
		eyebrow: 'CV / 2026',
		role1: 'IT apprentice',
		role2: 'Certified electrician EFZ',
		index: 'INDEX',
		close: 'CLOSE',
		navLabel: 'Index',
		indexToggleLabel: 'Toggle index',
		langLabel: 'Switch language'
	},
	theme: { dark: 'MODE: DARK', light: 'MODE: LIGHT', label: 'Switch color scheme' },
	profil: {
		title: 'Profile',
		headline1: 'Electricity understood.',
		headline2: 'Now code.',
		intro:
			'Four years of electrical installation, now retraining as a software developer at Komax AG. My main interests are IT security, algorithms and the communication between systems.',
		specName: 'NAME',
		specLocation: 'LOCATION',
		specBirthYear: 'BORN',
		specNationality: 'NATIONALITY',
		specLanguages: 'LANGUAGES',
		specStatus: 'STATUS',
		languagesValue: 'DE · IT · EN · FR',
		statusValue: 'IT apprentice, 3rd year · Komax AG',
		portraitAlt: 'Portrait of Laurent Scherrer',
		portraitCaption: 'FIG. 1 — SCHERRER, LAURENT LUCIEN',
		offWork: 'OUTSIDE THE OFFICE'
	},
	werdegang: { title: 'Career' },
	skills: {
		title: 'Skills',
		lead: 'Skills from both apprenticeships. Levels follow the scale from my official CV — L1 basic knowledge to L5 expert.',
		languagesTitle: 'LANGUAGES',
		interestsTitle: 'FOCUS AREAS'
	},
	projekte: {
		title: 'Projects',
		lead: 'Not a polished portfolio grid but the workbench: things I am working on right now.',
		status: {
			'in-progress': 'IN PROGRESS',
			live: 'LIVE',
			archived: 'ARCHIVED',
			concept: 'CONCEPT'
		} as Record<Project['status'], string>,
		linkText: (label: string) => `View ${label} →`
	},
	ausbildung: {
		title: 'Education',
		type: {
			apprenticeship: 'APPRENTICESHIP',
			school: 'SCHOOL',
			certification: 'CERTIFICATE'
		} as Record<Education['type'], string>
	},
	lab: {
		title: 'Lab',
		lead: 'A workshop for half-finished things — prototypes that are not production-ready yet but tell a story.',
		state: {
			geplant: 'PLANNED',
			skizziert: 'SKETCHED',
			bald: 'SOON'
		} as Record<LabExperiment['state'], string>,
		footnote: 'THIS PAGE GROWS OVER TIME — NEW EXPERIMENTS, NO UI REFACTORING.'
	},
	notes: {
		title: 'Notes',
		lead: 'Short write-ups on topics I am currently digging into. Still in preparation — content coming soon.',
		draft: 'DRAFT',
		dateLocale: 'en-GB'
	},
	kontakt: {
		title: 'Contact',
		heading: "Let's talk.",
		lead: 'Internship, security project or a chat about interfaces — drop me a line.',
		formTitle: 'SEND A MESSAGE',
		nameLabel: 'NAME',
		emailLabel: 'E-MAIL',
		messageLabel: 'MESSAGE',
		submit: 'Send message',
		submitting: 'Sending …',
		faqTitle: 'FREQUENTLY ASKED QUESTIONS',
		privacy: 'PRIVACY POLICY (GERMAN)'
	},
	formErrors: {
		name: 'Please enter your name.',
		email: 'Please enter a valid e-mail address.',
		message: 'The message is too short.',
		server: 'The server is not configured correctly.',
		send: 'The message could not be sent. Please try again later.'
	},
	cookie: {
		label: 'Cookie notice',
		text: 'I would like to use Google Analytics to understand how this site is used — but only with your consent. Nothing is loaded without it.',
		more: 'More in the privacy policy (German).',
		decline: 'Decline',
		accept: 'Accept'
	},
	danke: {
		seoTitle: 'Thanks for your message · Laurent Scherrer',
		seoDescription: 'Your message has arrived — I will get back to you as soon as possible.',
		eyebrow: 'STATUS — DELIVERED ✓',
		heading: 'Thanks — your message has arrived.',
		body: 'What happens next: I read every message personally and will get back to you by e-mail. Nothing else to do on your side.',
		home: 'Back to start →',
		projects: 'View projects →'
	},
	error: {
		notFoundTitle: 'Page not found · Laurent Scherrer',
		errorTitle: 'Error · Laurent Scherrer',
		seoDescription:
			'This page does not exist (anymore). Back to the start page or get in touch directly.',
		eyebrow: 'ERROR',
		notFoundBody:
			'This page does not exist — maybe a typo in the URL, maybe I rebuilt it. No problem: you can continue from here.',
		otherBody: 'Something went wrong. Please try again later — or drop me a quick line.',
		home: 'Back to start →',
		contact: 'Contact →'
	}
};

export const ui: Record<Locale, UiStrings> = { de, en };
