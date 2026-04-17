export interface NavItem {
	label: string;
	route:
		| '/'
		| '/about'
		| '/experience'
		| '/skills'
		| '/projects'
		| '/education'
		| '/contact'
		| '/lab'
		| '/notes';
	hash?: string;
}

export const primaryNav: NavItem[] = [
	{ label: 'Über mich', route: '/about' },
	{ label: 'Werdegang', route: '/experience' },
	{ label: 'Skills', route: '/skills' },
	{ label: 'Projekte', route: '/projects' },
	{ label: 'Ausbildung', route: '/education' },
	{ label: 'Lab', route: '/lab' },
	{ label: 'Notes', route: '/notes' },
	{ label: 'Kontakt', route: '/contact' }
];
