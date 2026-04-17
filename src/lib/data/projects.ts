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
		links: [{ label: 'Repository', href: 'https://github.com/' }],
		status: 'in-progress',
		year: '2026'
	},
	
	{
		id: 'net-cli-toolkit',
		title: '.NET CLI Toolkit',
		summary: 'Kleine Kommandozeilen-Werkzeuge zur Automatisierung wiederkehrender Aufgaben.',
		description:
			'Sammlung von C#-basierten CLI-Tools für Log-Analyse, Netzwerk-Pings und Dateioperationen. Entstanden während der Informatik-Lehre, um Muster in .NET, System.CommandLine und Dependency Injection zu üben.',
		stack: ['C#', '.NET', 'System.CommandLine'],
		links: [{ label: 'Repository', href: 'https://github.com/' }],
		status: 'in-progress',
		year: '2026'
	},
	
];
