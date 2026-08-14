import type { Locale } from '$lib/i18n';

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
	{ path: '/en', priority: 1.0 },
	{ path: '/datenschutz', priority: 0.3 }
];

/** Paths that exist but must not be crawled or indexed. */
export const privatePaths = ['/api/', '/danke', '/en/danke'];

/** Response-time window shown in the Kontakt section and FAQ. */
export const responseTime: Record<Locale, string> = { de: '48 Stunden', en: '48 hours' };
export const responseTimePromise: Record<Locale, string> = {
	de: 'Ich antworte innerhalb von 48 Stunden.',
	en: 'I reply within 48 hours.'
};
