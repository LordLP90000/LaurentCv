import type { Locale } from '$lib/i18n';

export interface Experience {
	id: string;
	role: string;
	company: string;
	period: string;
	start: string;
	end: string;
	location?: string;
	summary: string;
	highlights: string[];
	tags: string[];
}

const de: Experience[] = [
	{
		id: 'komax-applikationsentwickler',
		role: 'Lernender Applikationsentwickler (Zweitausbildung)',
		company: 'Komax AG',
		period: '2025 – heute',
		start: '2025',
		end: 'heute',
		location: 'Dierikon, Schweiz',
		summary:
			'Zweitausbildung zum Applikationsentwickler EFZ nach abgeschlossener Lehre als Elektroinstallateur. Aktuell im dritten Lehrjahr.',
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

const en: Experience[] = [
	{
		id: 'komax-applikationsentwickler',
		role: 'Software developer apprentice (second apprenticeship)',
		company: 'Komax AG',
		period: '2025 – present',
		start: '2025',
		end: 'present',
		location: 'Dierikon, Switzerland',
		summary:
			'Second apprenticeship as a software developer (EFZ) after completing my electrician apprenticeship. Currently in the third year.',
		highlights: [
			'Working across a range of programming languages and technologies',
			'Exposure to interfaces, frontend development and security',
			'Combining an electrical background with software engineering'
		],
		tags: ['C#', '.NET', 'TypeScript', 'Git', 'Azure DevOps']
	},
	{
		id: 'frey-cie-elektriker',
		role: 'Certified electrician EFZ',
		company: 'Frey & Cie',
		period: '2021 – 2025',
		start: '2021',
		end: '2025',
		location: 'Kriens, Switzerland',
		summary:
			'Four-year apprenticeship as a certified electrician with a focus on control and plant technology.',
		highlights: [
			'Programming Siemens Logo controls',
			'Installing and commissioning electrical systems',
			'Maintenance and troubleshooting of technical systems',
			'Reading and drawing electrical schematics',
			'Working to standards and safety regulations (NIV)'
		],
		tags: ['Siemens Logo', 'PLC', 'Schematics', 'NIV']
	}
];

export const experience: Record<Locale, Experience[]> = { de, en };
