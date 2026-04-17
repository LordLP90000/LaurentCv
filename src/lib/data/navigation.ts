export interface NavItem {
	label: string;
	route: '/' | '/lab' | '/notes';
	hash?: string;
}

export const primaryNav: NavItem[] = [
	{ label: 'Über mich', route: '/', hash: 'about' },
	{ label: 'Werdegang', route: '/', hash: 'experience' },
	{ label: 'Skills', route: '/', hash: 'skills' },
	{ label: 'Projekte', route: '/', hash: 'projects' },
	{ label: 'Ausbildung', route: '/', hash: 'education' },
	{ label: 'Lab', route: '/lab' },
	{ label: 'Notes', route: '/notes' },
	{ label: 'Kontakt', route: '/', hash: 'contact' }
];
