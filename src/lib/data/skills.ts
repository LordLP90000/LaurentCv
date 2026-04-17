export interface Skill {
	name: string;
	level: 1 | 2 | 3 | 4 | 5;
}

export interface SkillCategory {
	id: string;
	title: string;
	description: string;
	skills: Skill[];
}

export const skillLegend: Record<number, string> = {
	1: 'Grundkenntnisse',
	2: 'Zusammenhänge verstanden',
	3: 'Theoretisch + praktisch',
	4: 'Gute Kenntnisse',
	5: 'Experte'
};

export const skillCategories: SkillCategory[] = [
	{
		id: 'languages',
		title: 'Sprachen',
		description: 'Programmier- und Auszeichnungssprachen, mit denen ich arbeite.',
		skills: [
			{ name: 'C#', level: 3 },
			{ name: 'Python', level: 2 },
			{ name: 'TypeScript / JavaScript', level: 2 },
			{ name: 'HTML / CSS', level: 3 },
			{ name: 'Go', level: 2 },
			{ name: 'PHP', level: 2 },
			{ name: 'Siemens Logo (SPS)', level: 5 }
		]
	},
	{
		id: 'frameworks',
		title: 'Frameworks',
		description: 'Stacks und Frameworks aus Ausbildung und Projekten.',
		skills: [
			{ name: '.NET', level: 3 },
			{ name: 'Angular', level: 1 },
			{ name: 'SvelteKit', level: 2 }
		]
	},
	{
		id: 'tools',
		title: 'Tools & Plattformen',
		description: 'Betriebssysteme, Datenbanken, Cloud und Dev-Tooling.',
		skills: [
			{ name: 'Windows', level: 4 },
			{ name: 'Linux', level: 3 },
			{ name: 'macOS', level: 3 },
			{ name: 'SQL', level: 3 },
			{ name: 'MongoDB', level: 2 },
			{ name: 'Azure', level: 1 },
			{ name: 'Git', level: 2 },
			{ name: 'GitHub', level: 3 },
			{ name: 'Azure DevOps', level: 1 },
			{ name: 'VS Code', level: 3 },
			{ name: 'Visual Studio', level: 3 }
		]
	},
	{
		id: 'network-security',
		title: 'Netzwerk & Security',
		description: 'Mein Interessensschwerpunkt — Security und Infrastruktur.',
		skills: [
			{ name: 'TCP/IP', level: 4 },
			{ name: 'DNS', level: 3 },
			{ name: 'Firewall', level: 3 },
			{ name: 'WLAN', level: 4 },
			{ name: 'IT-Security Grundlagen', level: 3 }
		]
	},
	{
		id: 'electrical',
		title: 'Elektrotechnik',
		description: 'Wissen aus der Erstausbildung, das mir in der Industrie-IT hilft.',
		skills: [
			{ name: 'Siemens Logo Programmierung', level: 4 },
			{ name: 'Elektroinstallation', level: 5 },
			{ name: 'Technische Anlagen', level: 5 },
			{ name: 'Elektroschemas lesen', level: 5 },
			{ name: 'NIV / Sicherheitsnormen', level: 4 }
		]
	},
	{
		id: 'soft',
		title: 'Soft Skills',
		description: 'Arbeitsweise und Kollaboration.',
		skills: [
			{ name: 'Teamarbeit', level: 4 },
			{ name: 'Projektmitarbeit', level: 4 },
			{ name: 'Dokumentation', level: 3 },
			{ name: '1st-Level Support', level: 1 }
		]
	}
];

export const languages = [
	{ name: 'Deutsch', level: 'Muttersprache' },
	{ name: 'Italienisch', level: 'Muttersprache' },
	{ name: 'Englisch', level: 'B2 First' },
	{ name: 'Französisch', level: 'Schulisch (2015 – 2021)' }
];
