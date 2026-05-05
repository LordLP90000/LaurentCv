import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const MESSAGE_MIN = 10;
const NAME_MIN = 2;

export const actions: Actions = {
	contact: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const message = String(data.get('message') ?? '').trim();

		const values = { name, email, message };

		if (name.length < NAME_MIN) {
			return fail(400, { error: 'Bitte gib deinen Namen an.', values });
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'Bitte gib eine gültige E-Mail-Adresse an.', values });
		}
		if (message.length < MESSAGE_MIN) {
			return fail(400, { error: 'Die Nachricht ist zu kurz.', values });
		}

		if (!env.SENDWITH_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
			console.error('[contact] missing env var', {
				SENDWITH_API_KEY: !!env.SENDWITH_API_KEY,
				CONTACT_TO_EMAIL: !!env.CONTACT_TO_EMAIL,
				CONTACT_FROM_EMAIL: !!env.CONTACT_FROM_EMAIL,
				availableKeys: Object.keys(env).filter((k) => k.includes('SEND') || k.includes('CONTACT'))
			});
			return fail(500, { error: 'Der Server ist nicht korrekt konfiguriert.', values });
		}

		const response = await fetch('https://app.sendwith.email/api/send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${env.SENDWITH_API_KEY}`
			},
			body: JSON.stringify({
				message: {
					to: [{ email: env.CONTACT_TO_EMAIL }],
					from: { email: env.CONTACT_FROM_EMAIL },
					replyTo: [{ email }],
					subject: `Neue Kontaktanfrage von ${name}`,
					body: `Name: ${name}\nE-Mail: ${email}\n\n${message}`
				}
			})
		});

		if (!response.ok) {
			const errorBody = await response.text().catch(() => '');
			console.error('[contact] send error', response.status, errorBody);
			return fail(500, { error: 'Die Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut.', values });
		}

		return { success: true, values: { name: '', email: '', message: '' } };
	}
};
