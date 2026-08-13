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
		id: 'easyask',
		title: 'EasyAsk',
		summary:
			'KI-Antworten ohne Prompt-Wissen: kurze, verständliche Fragen statt leerem Chat-Feld.',
		description:
			'Statt eines leeren Chat-Felds stellt EasyAsk ein paar einfache Fragen, baut daraus im Hintergrund einen präzisen Prompt und liefert direkt brauchbare Antworten — mit Refine-Chips zum Nachjustieren. Eine Codebasis, drei Plattformen: Web, Desktop (Electron) und Mobile (Capacitor). Der Hono-Server ist die einzige Stelle mit Zugriff auf den API-Key.',
		stack: ['React', 'TypeScript', 'Hono', 'Node.js', 'Electron', 'Anthropic API'],
		links: [
			{ label: 'Live-App', href: 'https://easyask.vercel.app' },
			{ label: 'Repository', href: 'https://github.com/LordLP90000/easyask' }
		],
		status: 'in-progress',
		year: '2026'
	},
	{
		id: 'hudlscan',
		title: 'HudlScan',
		summary:
			'Analyse-Tool für Hudl-Playbooks, um automatisch Spielzüge zu erkennen und zu kategorisieren.',
		description:
			'Analyse-Tool für Hudl-Playbooks, entwickelt als SvelteKit-Anwendung mit Node-Backend. Inhalte sind strukturiert in TypeScript-Datendateien abgelegt, sodass neue Funktionen und Analysen ohne UI-Änderungen hinzugefügt werden können.',
		stack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Node.js'],
		links: [{ label: 'Repository', href: 'https://github.com/LordLP90000/HudlScan' }],
		status: 'in-progress',
		year: '2026'
	}
];
