import type { ParamMatcher } from '@sveltejs/kit';

/** Restricts [[lang=lang]] so /datenschutz keeps matching its own route. */
export const match: ParamMatcher = (param) => param === 'en';
