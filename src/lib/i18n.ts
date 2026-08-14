export type Locale = 'de' | 'en';
export const locales: Locale[] = ['de', 'en'];

/** Resolve the locale from route params ({ lang?: string }). */
export function localeOf(params: { lang?: string }): Locale {
	return params.lang === 'en' ? 'en' : 'de';
}

/** Path prefix for locale-aware hrefs: '' for de, '/en' for en. */
export function prefix(locale: Locale): string {
	return locale === 'en' ? '/en' : '';
}
