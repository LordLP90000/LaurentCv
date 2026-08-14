import { redirect, type Handle } from '@sveltejs/kit';

/** Routes retired by the Datenblatt one-pager redesign → their section anchors. */
const retiredRoutes: Record<string, string> = {
	'/about': '/#a-profil',
	'/experience': '/#a-werdegang',
	'/skills': '/#a-skills',
	'/projects': '/#a-projekte',
	'/education': '/#a-ausbildung',
	'/lab': '/#a-lab',
	'/notes': '/#a-notes',
	'/contact': '/#a-kontakt'
};

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname.replace(/\/+$/, '') || '/';
	const target = retiredRoutes[pathname];
	if (target) redirect(301, target);

	const lang = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'de';
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
