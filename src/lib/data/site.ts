/**
 * Central registry of all public, indexable pages.
 * Used by the sitemap endpoint and anywhere a full page list is needed.
 */
export interface PublicPage {
	path: string;
	/** Relative crawl priority, 0.0–1.0. */
	priority: number;
}

export const publicPages: PublicPage[] = [
	{ path: '/', priority: 1.0 },
	{ path: '/datenschutz', priority: 0.3 }
];

/** Paths that exist but must not be crawled or indexed. */
export const privatePaths = ['/api/', '/danke'];

/** Response-time window shown in the spec table, Kontakt section and FAQ. */
export const responseTime = '48 Stunden';
export const responseTimePromise = `Ich antworte innerhalb von ${responseTime}.`;
