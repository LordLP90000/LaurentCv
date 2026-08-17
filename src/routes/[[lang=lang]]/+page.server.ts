import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { ui } from '$data/ui';
import { localeOf } from '$lib/i18n';

const MESSAGE_MIN = 10;
const NAME_MIN = 2;

export const actions: Actions = {
	contact: async ({ request, params }) => {
		const t = ui[localeOf(params)].formErrors;
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const message = String(data.get('message') ?? '').trim();

		const values = { name, email, message };

		if (name.length < NAME_MIN) {
			return fail(400, { error: t.name, values });
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: t.email, values });
		}
		if (message.length < MESSAGE_MIN) {
			return fail(400, { error: t.message, values });
		}

		if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
			console.error('[contact] missing env var', {
				RESEND_API_KEY: !!env.RESEND_API_KEY,
				CONTACT_TO_EMAIL: !!env.CONTACT_TO_EMAIL,
				CONTACT_FROM_EMAIL: !!env.CONTACT_FROM_EMAIL,
				availableKeys: Object.keys(env).filter((k) => k.includes('SEND') || k.includes('CONTACT'))
			});
			return fail(500, { error: t.server, values });
		}

		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${env.RESEND_API_KEY}`
			},
			body: JSON.stringify({
				from: `Kontaktformular <${env.CONTACT_FROM_EMAIL}>`,
				to: [env.CONTACT_TO_EMAIL],
				reply_to: email,
				subject: `Neue Kontaktanfrage von ${name}`,
				text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`
			})
		});

		if (!response.ok) {
			const errorBody = await response.text().catch(() => '');
			console.error('[contact] send error', response.status, errorBody);
			return fail(500, {
				error: t.send,
				values
			});
		}

		redirect(303, localeOf(params) === 'en' ? '/en/danke' : '/danke');
	}
};
