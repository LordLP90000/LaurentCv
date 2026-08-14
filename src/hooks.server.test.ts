import { describe, expect, it } from 'vitest';
import type { RequestEvent } from '@sveltejs/kit';
import { handle } from './hooks.server';

const redirects: Array<[string, string]> = [
	['/about', '/#a-profil'],
	['/experience', '/#a-werdegang'],
	['/skills', '/#a-skills'],
	['/projects', '/#a-projekte'],
	['/education', '/#a-ausbildung'],
	['/lab', '/#a-lab'],
	['/notes', '/#a-notes'],
	['/contact', '/#a-kontakt']
];

function invoke(pathname: string) {
	const event = { url: new URL(`http://localhost${pathname}`) } as unknown as RequestEvent;
	const resolve = async () => new Response('ok');
	return Promise.resolve(handle({ event, resolve } as never));
}

describe('hooks.server handle', () => {
	it.each(redirects)('301-redirects %s to %s', async (from, to) => {
		const err = await invoke(from).then(
			() => null,
			(e) => e
		);
		expect(err).toMatchObject({ status: 301, location: to });
	});

	it('redirects trailing-slash variants', async () => {
		const err = await invoke('/about/').then(
			() => null,
			(e) => e
		);
		expect(err).toMatchObject({ status: 301, location: '/#a-profil' });
	});

	it('resolves untouched routes normally', async () => {
		const res = (await invoke('/')) as Response;
		expect(await res.text()).toBe('ok');
	});

	it.each([
		['/', 'de'],
		['/danke', 'de'],
		['/en', 'en'],
		['/en/danke', 'en'],
		['/enx', 'de'],
		['/en/', 'en']
	])('stamps <html lang> for %s as %s', async (path, lang) => {
		const event = { url: new URL(`http://localhost${path}`) } as unknown as RequestEvent;
		let transformed: string | undefined;
		const resolve = async (
			_event: unknown,
			opts?: { transformPageChunk?: (input: { html: string; done: boolean }) => string }
		) => {
			transformed = opts?.transformPageChunk?.({ html: '<html lang="%lang%">', done: true });
			return new Response('ok');
		};
		await handle({ event, resolve } as never);
		expect(transformed).toBe(`<html lang="${lang}">`);
	});
});
