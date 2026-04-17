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
		id: 'siemens-logo-hausautomation',
		title: 'Siemens Logo Hausautomation',
		summary: 'Steuerung für Licht, Rollladen und Heizung während der Elektriker-Lehre.',
		description:
			'Während meiner Erstausbildung habe ich mehrere Siemens Logo Programme für kleine Automationen geschrieben — inklusive Zeitschaltlogik, Sensorik und einer Bedienlogik, die ohne Cloud auskommt.',
		stack: ['Siemens Logo', 'SPS', 'LOGO!Soft Comfort'],
		links: [],
		status: 'archived',
		year: '2024'
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
	{
		id: 'home-lab-security',
		title: 'Home Lab · Security',
		summary: 'Privates Lab für Vulnerability Scanning und Netzwerk-Monitoring.',
		description:
			'Virtualisiertes Home-Lab mit segmentierten Netzen, einer pfSense-Firewall und Tools wie OpenVAS und Wireshark. Ziel ist, Security-Konzepte (Zero Trust, Logging, Scanning) praktisch zu erproben.',
		stack: ['pfSense', 'OpenVAS', 'Wireshark', 'Linux'],
		links: [],
		status: 'concept',
		year: '2026'
	}
];
