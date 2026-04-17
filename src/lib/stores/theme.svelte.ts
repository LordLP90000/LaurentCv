import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createTheme() {
	const initial: Theme = browser
		? ((localStorage.getItem('theme') as Theme | null) ??
			(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark'))
		: 'dark';

	let current = $state<Theme>(initial);

	if (browser) {
		document.documentElement.classList.toggle('dark', current === 'dark');
	}

	return {
		get value() {
			return current;
		},
		toggle() {
			current = current === 'dark' ? 'light' : 'dark';
			if (browser) {
				localStorage.setItem('theme', current);
				document.documentElement.classList.toggle('dark', current === 'dark');
			}
		},
		set(next: Theme) {
			current = next;
			if (browser) {
				localStorage.setItem('theme', current);
				document.documentElement.classList.toggle('dark', current === 'dark');
			}
		}
	};
}

export const theme = createTheme();
