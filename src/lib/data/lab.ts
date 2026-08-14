import type { Locale } from '$lib/i18n';

export interface LabExperiment {
	title: string;
	description: string;
	state: 'geplant' | 'skizziert' | 'bald';
}

const de: LabExperiment[] = [
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

const en: LabExperiment[] = [
	{
		title: 'Security Sandbox',
		description:
			'This is where experiments on vulnerability scanning, logging pipelines and zero-trust concepts will land.',
		state: 'geplant'
	},
	{
		title: 'OPC UA Playground',
		description:
			'Small demos on communication between industrial devices and modern web frontends.',
		state: 'skizziert'
	},
	{
		title: 'Svelte + industrial UI',
		description:
			'Prototypes for interfaces that talk directly to machines — inspired by Angular frontends at Delta.',
		state: 'bald'
	}
];

export const experiments: Record<Locale, LabExperiment[]> = { de, en };
