/**
 * Testimonials / Referenzen.
 *
 * Alle Einträge sind Platzhalter, bis echte Zitate vorliegen (mit Einverständnis
 * der zitierten Person!). Solange Platzhalter angezeigt werden, wird bewusst
 * KEIN Review-/AggregateRating-Schema ausgegeben — niemals erfundene Bewertungen
 * als strukturierte Daten publizieren.
 */
export interface Testimonial {
	id: string;
	quote: string;
	/** Name der Person — nur mit deren Einverständnis veröffentlichen. */
	author: string;
	role: string;
}

export const testimonials: Testimonial[] = [
	{
		id: 'testimonial-1',
		quote: '[PLACEHOLDER — Zitat, z. B. von Berufsbildner:in oder Lehrperson]',
		author: '[PLACEHOLDER — Name]',
		role: '[PLACEHOLDER — Rolle, z. B. "Berufsbildner"]'
	},
	{
		id: 'testimonial-2',
		quote: '[PLACEHOLDER — Zitat, z. B. aus einem Projekt oder Team]',
		author: '[PLACEHOLDER — Name]',
		role: '[PLACEHOLDER — Rolle]'
	}
];
