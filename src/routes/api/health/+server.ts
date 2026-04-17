import { json } from '@sveltejs/kit';

export const GET = () => {
	return json({
		status: 'ok',
		uptime: process.uptime(),
		timestamp: new Date().toISOString()
	});
};
