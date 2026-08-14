import type { Locale } from '$lib/i18n';

export interface Profile {
	name: string;
	title: string;
	tagline: string[];
	location: string;
	email: string;
	phone: string;
	birthDate: string;
	citizenship: string;
	bio: string;
	social: SocialLink[];
}

export interface SocialLink {
	label: string;
	href: string;
	icon: 'github' | 'linkedin' | 'mail' | 'phone';
}

const de: Profile = {
	name: 'Laurent Lucien Scherrer',
	title: 'Informatiker in Ausbildung · Elektroinstallateur EFZ',
	tagline: [
		'From circuits to code.',
		'Elektriker EFZ, jetzt auf dem Weg zum Informatiker.',
		'Security · Algorithmen · Schnittstellen.'
	],
	location: 'Meggen, Schweiz',
	email: 'laurent.scherrer@gmx.ch',
	phone: '+41 76 511 98 45',
	birthDate: '09.04.2005',
	citizenship: 'CH / IT',
	bio: `Nach meiner vierjährigen Erstausbildung zum Elektroinstallateur EFZ bringe ich ein fundiertes Verständnis für technische Anlagen, elektrische Systeme und industrielle Abläufe mit. Die Arbeit mit Siemens Logo Steuerungen hat mein Interesse an der Informatik geweckt — aktuell bin ich im dritten Lehrjahr meiner Zweitausbildung als Informatiker bei der Komax AG. Mein besonderes Interesse gilt IT-Security, Algorithmen und der Kommunikation zwischen Systemen.`,
	social: [
		{ label: 'GitHub', href: 'https://github.com/LordLP90000', icon: 'github' },
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/laurent-lucien-scherrer-43a918237',
			icon: 'linkedin'
		},
		{ label: 'E-Mail', href: 'mailto:laurent.scherrer@gmx.ch', icon: 'mail' },
		{ label: 'Telefon', href: 'tel:+41765119845', icon: 'phone' }
	]
};

const en: Profile = {
	name: 'Laurent Lucien Scherrer',
	title: 'IT apprentice · Certified electrician EFZ',
	tagline: [
		'From circuits to code.',
		'Certified electrician, now becoming a software developer.',
		'Security · algorithms · interfaces.'
	],
	location: 'Meggen, Switzerland',
	email: 'laurent.scherrer@gmx.ch',
	phone: '+41 76 511 98 45',
	birthDate: '09.04.2005',
	citizenship: 'CH / IT',
	bio: `After my four-year first apprenticeship as a certified electrician (EFZ) I bring a solid understanding of technical installations, electrical systems and industrial processes. Working with Siemens Logo controls sparked my interest in software — I am currently in the third year of my second apprenticeship as a software developer at Komax AG. My main interests are IT security, algorithms and the communication between systems.`,
	social: [
		{ label: 'GitHub', href: 'https://github.com/LordLP90000', icon: 'github' },
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/laurent-lucien-scherrer-43a918237',
			icon: 'linkedin'
		},
		{ label: 'E-mail', href: 'mailto:laurent.scherrer@gmx.ch', icon: 'mail' },
		{ label: 'Phone', href: 'tel:+41765119845', icon: 'phone' }
	]
};

export const profile: Record<Locale, Profile> = { de, en };
