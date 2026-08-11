import { browser } from '$app/environment';

/**
 * Analytics consent state, persisted in local storage.
 * 'unknown' means the banner has not been answered yet — no analytics load.
 */
type Consent = 'unknown' | 'granted' | 'denied';

const STORAGE_KEY = 'analytics-consent';

function createConsent() {
	const stored = browser ? (localStorage.getItem(STORAGE_KEY) as Consent | null) : null;
	const initial: Consent = stored === 'granted' || stored === 'denied' ? stored : 'unknown';

	let current = $state<Consent>(initial);

	return {
		get value() {
			return current;
		},
		set(next: 'granted' | 'denied') {
			current = next;
			if (browser) {
				localStorage.setItem(STORAGE_KEY, next);
			}
		}
	};
}

export const consent = createConsent();
