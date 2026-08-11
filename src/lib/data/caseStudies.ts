/**
 * Case studies follow a fixed structure: Kontext → Herausforderung → Lösung → Ergebnis.
 * All content is [PLACEHOLDER] until real stories are filled in.
 *
 * WICHTIG: Keine internen Projektdetails des Arbeitgebers verwenden —
 * nur eigene, öffentliche oder ausdrücklich freigegebene Projekte beschreiben.
 * Keine erfundenen Namen oder Zahlen eintragen.
 */
export interface CaseStudy {
	id: string;
	/** Art des Auftraggebers/Kontexts, z. B. "Eigenes Projekt" oder "Schulprojekt". */
	context: string;
	title: string;
	challenge: string;
	solution: string;
	result: string;
}

export const caseStudies: CaseStudy[] = [
	{
		id: 'case-1',
		context: '[PLACEHOLDER — Kontext, z. B. "Eigenes Projekt"]',
		title: '[PLACEHOLDER — Titel der Story]',
		challenge: '[PLACEHOLDER — Ausgangslage: Welches Problem war zu lösen?]',
		solution: '[PLACEHOLDER — Vorgehen: Wie bist du es angegangen, mit welchen Technologien?]',
		result: '[PLACEHOLDER — Ergebnis: Was ist dabei herausgekommen, was hast du gelernt?]'
	},
	{
		id: 'case-2',
		context: '[PLACEHOLDER — Kontext, z. B. "Schulprojekt"]',
		title: '[PLACEHOLDER — Titel der Story]',
		challenge: '[PLACEHOLDER — Ausgangslage]',
		solution: '[PLACEHOLDER — Vorgehen]',
		result: '[PLACEHOLDER — Ergebnis]'
	},
	{
		id: 'case-3',
		context: '[PLACEHOLDER — Kontext]',
		title: '[PLACEHOLDER — Titel der Story]',
		challenge: '[PLACEHOLDER — Ausgangslage]',
		solution: '[PLACEHOLDER — Vorgehen]',
		result: '[PLACEHOLDER — Ergebnis]'
	}
];
