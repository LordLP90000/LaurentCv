export interface Project {
	id: string;
	title: string;
	summary: string;
	description: string;
	stack: string[];
	links: { label: string; href: string }[];
	status: 'live' | 'in-progress' | 'archived' | 'concept';
	year: string;
}

export const projects: Project[] = [
	{
		id: 'laurent-cv',
		title: 'Living CV',
		summary: 'Dieses Portfolio. Ein modularer, sich weiterentwickelnder Lebenslauf mit SvelteKit.',
		description:
			'Persönliche Portfolio-Seite als SvelteKit-Anwendung mit Node-Backend. Inhalte sind strukturiert in TypeScript-Datendateien abgelegt, sodass neue Abschnitte, Projekte und Skills ohne UI-Änderungen hinzugefügt werden können.',
		stack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Node.js'],
		links: [{ label: 'Repository', href: 'https://github.com/LordLP90000/LaurentCv' }],
		status: 'in-progress',
		year: '2026'
	},
	{
		id: 'hudlscan',
		title: 'HudlScan',
		summary: 'Analyse-Tool für Hudl-Playbooks, um automatisch Spielzüge zu erkennen und zu kategorisieren.',
		description:
			'Analyse-Tool für Hudl-Playbooks, entwickelt als SvelteKit-Anwendung mit Node-Backend. Inhalte sind strukturiert in TypeScript-Datendateien abgelegt, sodass neue Funktionen und Analysen ohne UI-Änderungen hinzugefügt werden können.',
		stack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Node.js'],
		links: [{ label: 'Repository', href: 'https://github.com/LordLP90000/HudlScan' }],
		status: 'in-progress',
		year: '2026'
	},
	

	
];
