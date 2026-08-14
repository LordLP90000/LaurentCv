import { describe, expect, it } from 'vitest';
import { localeOf, prefix } from './i18n';

describe('localeOf', () => {
	it('defaults to de when no lang param exists', () => {
		expect(localeOf({})).toBe('de');
	});

	it('returns en for lang=en', () => {
		expect(localeOf({ lang: 'en' })).toBe('en');
	});

	it('falls back to de for unknown values', () => {
		expect(localeOf({ lang: 'fr' })).toBe('de');
	});
});

describe('prefix', () => {
	it('is empty for de and /en for en', () => {
		expect(prefix('de')).toBe('');
		expect(prefix('en')).toBe('/en');
	});
});
