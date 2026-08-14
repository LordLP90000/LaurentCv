export interface SectionNav {
	id: string;
	num: string;
	label: string;
}

/** The one-pager's section index — single source for sidebar nav and section numbering. */
export const sections: SectionNav[] = [
	{ id: 'a-profil', num: '01', label: 'PROFIL' },
	{ id: 'a-werdegang', num: '02', label: 'WERDEGANG' },
	{ id: 'a-skills', num: '03', label: 'SKILLS' },
	{ id: 'a-projekte', num: '04', label: 'PROJEKTE' },
	{ id: 'a-ausbildung', num: '05', label: 'AUSBILDUNG' },
	{ id: 'a-lab', num: '06', label: 'LAB' },
	{ id: 'a-notes', num: '07', label: 'NOTES' },
	{ id: 'a-kontakt', num: '08', label: 'KONTAKT' }
];
