import { useState, useEffect } from 'react';
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

export default function useApi() {
	const baseUrl = config.baseUrl;
	const [locked, setLocked] = useState(false);
	const csrf = async () => {
		return await fetch(`${baseUrl}/auth/csrf-cookie`, getOptions('GET'));
	};
	const api = async (url: string, method: string, body?: object) => {
		if (locked) return;
		setLocked(true);
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
			setLocked(false);
		}
	};
	return api;
}
