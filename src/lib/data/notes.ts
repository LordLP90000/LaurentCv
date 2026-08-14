import type { Locale } from '$lib/i18n';

export interface Note {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
}

const de: Note[] = [
	{
		slug: 'vom-schaltschrank-zur-shell',
		title: 'Vom Schaltschrank zur Shell',
		date: '2026-03-01',
		excerpt:
			'Was meine Elektriker-Lehre mir über Software beigebracht hat — und warum Siemens Logo ein überraschend guter Einstieg in Logik war.'
	},
	{
		slug: 'security-als-einsteiger',
		title: 'Security als Einsteiger: Erwartung vs. Realität',
		date: '2026-02-12',
		excerpt:
			'Notizen dazu, warum Security mich wirklich interessiert — jenseits der Hollywood-Vorstellung vom Hacker.'
	}
];

const en: Note[] = [
	{
		slug: 'vom-schaltschrank-zur-shell',
		title: 'From switch cabinet to shell',
		date: '2026-03-01',
		excerpt:
			'What my electrician apprenticeship taught me about software — and why Siemens Logo was a surprisingly good introduction to logic.'
	},
	{
		slug: 'security-als-einsteiger',
		title: 'Security as a beginner: expectation vs. reality',
		date: '2026-02-12',
		excerpt:
			'Notes on why security genuinely interests me — beyond the Hollywood image of the hacker.'
	}
];

export const notes: Record<Locale, Note[]> = { de, en };
