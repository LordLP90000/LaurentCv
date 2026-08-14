export interface LabExperiment {
	title: string;
	description: string;
	state: 'geplant' | 'skizziert' | 'bald';
}

export const experiments: LabExperiment[] = [
	{
		title: 'Security Sandbox',
		description:
			'Hier werden Experimente zu Vulnerability Scanning, Logging-Pipelines und Zero-Trust-Konzepten landen.',
		state: 'geplant'
	},
	{
		title: 'OPC UA Playground',
		description:
			'Kleine Demos zur Kommunikation zwischen industriellen Geräten und modernen Web-Frontends.',
		state: 'skizziert'
	},
	{
		title: 'Svelte + Industrie-UI',
		description:
			'Prototypen für Oberflächen, die direkt mit Maschinen sprechen — inspiriert von Angular-Frontends bei Delta.',
		state: 'bald'
	}
];
