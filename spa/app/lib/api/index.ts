import config from '~/config';

function getOptions(method = "GET", signal: AbortSignal | null = null) {
	return {
		mode: "cors",
		credentials: "include",
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json',
		},
		method,
		signal: signal
	} as const;
};

export default async function api(url: string, method: string, body?: object) {
	const baseUrl = config.baseUrl;
	const csrf = async () => {
		return await fetch(`${baseUrl}/auth/csrf-cookie`, getOptions('GET'));
	};
	await csrf();
	const controller = new AbortController();
	try {
		const response = await fetch(`${baseUrl}${url}`, {
			...getOptions(method, controller.signal),
			body: JSON.stringify(body),
		});
		if (response.ok) {
			return await response.json();
		} else {
			throw response;
		}
	} finally {
		controller.abort();
	}
}
