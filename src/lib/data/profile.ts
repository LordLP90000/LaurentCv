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

export const profile: Profile = {
	name: 'Laurent Lucien Scherrer',
	title: 'Informatiker in Ausbildung · Elektroinstallateur EFZ',
	tagline: [
		'From circuits to code.',
		'Elektriker EFZ, jetzt auf dem Weg zum Informatiker.',
		'Security · Algorithmen · Schnittstellen.'
	],
	location: 'Meggen, Schweiz',
	email: 'laurent.scherrer@komaxgroup.com',
	phone: '+41 76 511 98 45',
	birthDate: '09.04.2005',
	citizenship: 'CH / IT',
	bio: `Nach meiner vierjährigen Erstausbildung zum Elektroinstallateur EFZ bringe ich ein fundiertes Verständnis für technische Anlagen, elektrische Systeme und industrielle Abläufe mit. Die Arbeit mit Siemens Logo Steuerungen hat mein Interesse an der Informatik geweckt — aktuell bin ich im zweiten Lehrjahr meiner Zweitausbildung als Informatiker bei der Komax AG. Mein besonderes Interesse gilt IT-Security, Algorithmen und der Kommunikation zwischen Systemen.`,
	social: [
		{ label: 'GitHub', href: 'https://github.com/LordLP90000', icon: 'github' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/laurent-lucien-scherrer-43a918237', icon: 'linkedin' },
		{ label: 'E-Mail', href: 'mailto:laurent.scherrer@komaxgroup.com', icon: 'mail' },
		{ label: 'Telefon', href: 'tel:+41765119845', icon: 'phone' }
	]
};
