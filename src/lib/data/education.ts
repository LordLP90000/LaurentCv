export interface Education {
	id: string;
	title: string;
	institution: string;
	period: string;
	description?: string;
	type: 'apprenticeship' | 'school' | 'certification';
}

export const education: Education[] = [
	{
		id: 'komax-applikationsentwickler',
		title: 'Applikationsentwickler EFZ (Zweitausbildung)',
		institution: 'Komax AG · Berufsschule',
		period: '2025 – laufend',
		description: 'Zweitausbildung, aktuell im zweiten Lehrjahr.',
		type: 'apprenticeship'
	},
	{
		id: 'frey-cie-elektriker',
		title: 'Elektroinstallateur EFZ',
		institution: 'Frey & Cie · Kriens',
		period: '2021 – 2025',
		description: 'Vierjährige Grundbildung zum Elektroinstallateur EFZ, abgeschlossen 2025.',
		type: 'apprenticeship'
	},
	{
		id: 'wirtschaftsmittelschule',
		title: 'Wirtschaftsmittelschule',
		institution: 'Luzern',
		period: '2020 – 2021',
		type: 'school'
	},
	{
		id: 'sekundarschule',
		title: 'Sekundarschule',
		institution: 'Meggen',
		period: '2017 – 2020',
		type: 'school'
	},
	{
		id: 'b2-first',
		title: 'B2 First (Englisch)',
		institution: 'Cambridge English',
		period: 'Zertifikat',
		type: 'certification'
	}
];
