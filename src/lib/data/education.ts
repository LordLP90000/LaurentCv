import type { Locale } from '$lib/i18n';

export interface Education {
	id: string;
	title: string;
	institution: string;
	period: string;
	description?: string;
	type: 'apprenticeship' | 'school' | 'certification';
}

const de: Education[] = [
	{
		id: 'komax-applikationsentwickler',
		title: 'Applikationsentwickler EFZ (Zweitausbildung)',
		institution: 'Komax AG · Berufsschule',
		period: '2025 – laufend',
		description: 'Zweitausbildung, aktuell im dritten Lehrjahr.',
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

const en: Education[] = [
	{
		id: 'komax-applikationsentwickler',
		title: 'Software developer EFZ (second apprenticeship)',
		institution: 'Komax AG · Vocational school',
		period: '2025 – ongoing',
		description: 'Second apprenticeship, currently in the third year.',
		type: 'apprenticeship'
	},
	{
		id: 'frey-cie-elektriker',
		title: 'Certified electrician EFZ',
		institution: 'Frey & Cie · Kriens',
		period: '2021 – 2025',
		description: 'Four-year apprenticeship as a certified electrician, completed 2025.',
		type: 'apprenticeship'
	},
	{
		id: 'wirtschaftsmittelschule',
		title: 'Business middle school',
		institution: 'Lucerne',
		period: '2020 – 2021',
		type: 'school'
	},
	{
		id: 'sekundarschule',
		title: 'Secondary school',
		institution: 'Meggen',
		period: '2017 – 2020',
		type: 'school'
	},
	{
		id: 'b2-first',
		title: 'B2 First (English)',
		institution: 'Cambridge English',
		period: 'Certificate',
		type: 'certification'
	}
];

export const education: Record<Locale, Education[]> = { de, en };
