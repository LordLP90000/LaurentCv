/**
 * FAQ entries — drafted for review, edit freely.
 * Answers are also used as plain text in the FAQPage JSON-LD.
 */
export interface FaqEntry {
	question: string;
	answer: string;
}

export const faq: FaqEntry[] = [
	{
		question: 'Wo stehst du gerade in deiner Ausbildung?',
		answer:
			'Ich bin im zweiten Lehrjahr meiner Zweitausbildung zum Applikationsentwickler EFZ bei der Komax AG. Davor habe ich eine vierjährige Lehre als Elektroinstallateur EFZ abgeschlossen. Voraussichtlicher Lehrabschluss: [PLACEHOLDER — Jahr].'
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
			'Am einfachsten über das Kontaktformular oder per E-Mail. Ich antworte innerhalb von [X].'
	}
];
