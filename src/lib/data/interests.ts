export interface InterestArea {
	priority: number;
	title: string;
	description: string;
	tags: string[];
}

export const interestAreas: InterestArea[] = [
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

export const hobbies = ['American Football', 'Snowboarden', 'Gym', 'Gaming', 'Kochen'];
