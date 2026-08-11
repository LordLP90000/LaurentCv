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
	{ path: '/about', priority: 0.9 },
	{ path: '/experience', priority: 0.9 },
	{ path: '/skills', priority: 0.8 },
	{ path: '/projects', priority: 0.8 },
	{ path: '/education', priority: 0.7 },
	{ path: '/lab', priority: 0.5 },
	{ path: '/notes', priority: 0.5 },
	{ path: '/contact', priority: 0.9 },
	{ path: '/datenschutz', priority: 0.3 }
];

/** Paths that exist but must not be crawled or indexed. */
export const privatePaths = ['/api/', '/danke'];
