import { describe, expect, it } from 'vitest';
import { match } from './lang';

describe('lang param matcher', () => {
	it('accepts en', () => {
		expect(match('en')).toBe(true);
	});

	it('rejects everything else', () => {
		for (const value of ['de', 'datenschutz', 'EN', 'en/', '']) {
			expect(match(value)).toBe(false);
		}
	});
});
