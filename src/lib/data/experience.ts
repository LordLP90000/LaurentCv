export interface Experience {
	id: string;
	role: string;
	company: string;
	period: string;
	start: string;
	end: string | 'heute';
	location?: string;
	summary: string;
	highlights: string[];
	tags: string[];
}

export const experience: Experience[] = [
	{
		id: 'komax-applikationsentwickler',
		role: 'Lernender Applikationsentwickler (Zweitausbildung)',
		company: 'Komax AG',
		period: '2025 – heute',
		start: '2025',
		end: 'heute',
		location: 'Dierikon, Schweiz',
		summary:
			'Zweitausbildung zum Applikationsentwickler EFZ nach abgeschlossener Lehre als Elektroinstallateur. Aktuell im zweiten Lehrjahr.',
		highlights: [
			'Arbeit in diversen Programmiersprachen und Technologien',
			'Einblick in Schnittstellen, Frontend-Entwicklung und Security',
			'Kombination aus elektrotechnischem Hintergrund und Software-Engineering'
		],
		tags: ['C#', '.NET', 'TypeScript', 'Git', 'Azure DevOps']
	},
	{
		id: 'frey-cie-elektriker',
		role: 'Elektroinstallateur EFZ',
		company: 'Frey & Cie',
		period: '2021 – 2025',
		start: '2021',
		end: '2025',
		location: 'Kriens, Schweiz',
		summary:
			'Vierjährige Grundbildung zum Elektroinstallateur EFZ mit Fokus auf Steuerungs- und Anlagentechnik.',
		highlights: [
			'Programmierung von Siemens Logo Steuerungen',
			'Installation und Inbetriebnahme elektrischer Anlagen',
			'Wartung und Fehlersuche an technischen Systemen',
			'Lesen und Erstellen von Elektroschemas',
			'Arbeit nach Normen und Sicherheitsvorschriften (NIV)'
		],
		tags: ['Siemens Logo', 'SPS', 'Schemas', 'NIV']
	}
];
