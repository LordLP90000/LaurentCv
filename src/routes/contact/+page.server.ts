import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

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

		console.log('[contact]', { name, email, length: message.length });

		return { success: true, values: { name: '', email: '', message: '' } };
	}
};
