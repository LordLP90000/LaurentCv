import type { Locale } from '$lib/i18n';

export interface InterestArea {
	priority: number;
	title: string;
	description: string;
	tags: string[];
}

const de: InterestArea[] = [
	{
		priority: 1,
		title: 'Security',
		description:
			'Cloud Security, Datenschutz, Vulnerability Scanning & Management, Einhaltung von Normen. Der Bereich, in dem ich mich langfristig sehe — Systeme absichern und Schwachstellen aufdecken.',
		tags: ['Cloud Security', 'Vulnerability Management', 'Compliance', 'Datenschutz']
	},
	{
		priority: 2,
		title: 'Schnittstellen',
		description:
			'OPC UA, REST — wie Systeme und Maschinen kommunizieren. Durch meinen Hintergrund als Elektriker verstehe ich die Hardware-Seite und möchte das auf der Software-Seite vertiefen.',
		tags: ['OPC UA', 'REST', 'Integration']
	},
	{
		priority: 3,
		title: 'Angular Frontend',
		description:
			'Frontends für industrielle Maschinen (Delta). Interfaces, die direkt mit der Anlage sprechen — das unmittelbare Feedback macht die Arbeit reizvoll.',
		tags: ['Angular', 'TypeScript', 'Industrie-UI']
	}
];

const en: InterestArea[] = [
	{
		priority: 1,
		title: 'Security',
		description:
			'Cloud security, data protection, vulnerability scanning & management, compliance with standards. The area I see myself in long-term — hardening systems and uncovering weaknesses.',
		tags: ['Cloud Security', 'Vulnerability Management', 'Compliance', 'Data protection']
	},
	{
		priority: 2,
		title: 'Interfaces',
		description:
			'OPC UA, REST — how systems and machines communicate. My background as an electrician gives me the hardware side; I want to deepen the software side.',
		tags: ['OPC UA', 'REST', 'Integration']
	},
	{
		priority: 3,
		title: 'Angular frontend',
		description:
			'Frontends for industrial machines (Delta). Interfaces that talk directly to the plant — the immediate feedback is what makes this work appealing.',
		tags: ['Angular', 'TypeScript', 'Industrial UI']
	}
];

export const interestAreas: Record<Locale, InterestArea[]> = { de, en };

export const hobbies: Record<Locale, string[]> = {
	de: ['American Football', 'Snowboarden', 'Gym', 'Gaming', 'Kochen'],
	en: ['American football', 'Snowboarding', 'Gym', 'Gaming', 'Cooking']
};
