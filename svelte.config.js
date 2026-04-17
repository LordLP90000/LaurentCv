import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$data: 'src/lib/data',
			$components: 'src/lib/components'
		}
	}
};

export default config;
