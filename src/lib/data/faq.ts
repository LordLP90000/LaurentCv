import type { Locale } from '$lib/i18n';

/**
 * FAQ entries — drafted for review, edit freely.
 * Answers are also used as plain text in the FAQPage JSON-LD.
 */
export interface FaqEntry {
	question: string;
	answer: string;
}

const de: FaqEntry[] = [
	{
		question: 'Wo stehst du gerade in deiner Ausbildung?',
		answer:
			'Ich bin im dritten Lehrjahr meiner Zweitausbildung zum Applikationsentwickler EFZ bei der Komax AG. Davor habe ich eine vierjährige Lehre als Elektroinstallateur EFZ abgeschlossen.'
	},
	{
		question: 'Für welche Anfragen bist du offen?',
		answer:
			'Für Security-Projekte, Tech-Austausch, Nebenprojekte und alles rund um Schnittstellen zwischen Systemen. Schreib mir einfach über das Kontaktformular — auch wenn du nur eine Frage zu einem meiner Projekte hast.'
	},
	{
		question: 'Mit welchen Technologien arbeitest du hauptsächlich?',
		answer:
			'In der Ausbildung vor allem C#, .NET, TypeScript, Git und Azure DevOps. Privat baue ich mit SvelteKit und Tailwind CSS — diese Website ist selbst eines dieser Projekte. Dazu kommt mein Elektro-Background mit Siemens Logo und Steuerungstechnik.'
	},
	{
		question: 'Was unterscheidet dich von anderen Entwicklern am Anfang ihrer Laufbahn?',
		answer:
			'Die Kombination aus zwei Ausbildungen: Aus vier Jahren Elektroinstallation bringe ich ein praktisches Verständnis für Anlagen, Hardware und industrielle Abläufe mit — das hilft überall dort, wo Software mit Maschinen und realen Systemen spricht.'
	},
	{
		question: 'Wie erreiche ich dich am besten?',
		answer:
			'Am einfachsten über das Kontaktformular oder per E-Mail. Ich antworte innerhalb von 48 Stunden.'
	}
];

const en: FaqEntry[] = [
	{
		question: 'Where are you in your training right now?',
		answer:
			'I am in the third year of my second apprenticeship as a software developer (Applikationsentwickler EFZ) at Komax AG. Before that I completed a four-year apprenticeship as a certified electrician (EFZ).'
	},
	{
		question: 'What kind of requests are you open to?',
		answer:
			'Security projects, tech exchanges, side projects and anything related to interfaces between systems. Just write me via the contact form — even if you only have a question about one of my projects.'
	},
	{
		question: 'Which technologies do you mainly work with?',
		answer:
			'In my apprenticeship mainly C#, .NET, TypeScript, Git and Azure DevOps. Privately I build with SvelteKit and Tailwind CSS — this website is itself one of those projects. On top of that comes my electrical background with Siemens Logo and control technology.'
	},
	{
		question: 'What sets you apart from other developers at the start of their career?',
		answer:
			'The combination of two apprenticeships: four years of electrical installation gave me a practical understanding of plants, hardware and industrial processes — that helps wherever software talks to machines and real-world systems.'
	},
	{
		question: 'What is the best way to reach you?',
		answer: 'Easiest via the contact form or by e-mail. I reply within 48 hours.'
	}
];

export const faq: Record<Locale, FaqEntry[]> = { de, en };
