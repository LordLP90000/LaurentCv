export interface Note {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
}

export const notes: Note[] = [
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
