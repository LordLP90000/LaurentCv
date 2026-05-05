import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { Resend } from 'resend';

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

		if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
			console.error('[contact] missing RESEND_API_KEY or CONTACT_TO_EMAIL env var');
			return fail(500, { error: 'Der Server ist nicht korrekt konfiguriert.', values });
		}

		const resend = new Resend(env.RESEND_API_KEY);
		const { error: sendError } = await resend.emails.send({
			from: 'Kontaktformular <onboarding@resend.dev>',
			to: env.CONTACT_TO_EMAIL,
			replyTo: email,
			subject: `Neue Kontaktanfrage von ${name}`,
			text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`
		});

		if (sendError) {
			console.error('[contact] send error', sendError);
			return fail(500, { error: 'Die Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut.', values });
		}

		return { success: true, values: { name: '', email: '', message: '' } };
	}
};
