import { useState } from 'react';
import { baseUrl } from 'config/backend';

export default function useApi() {
	async function api<T extends object>(path: string, method = "GET", body?: object, signal: AbortSignal | null = null) {
		await csrf(signal);
		const response = await fetch(`${path}`, getOptions(method, signal, body));
		const data = await response.json();
		return data;
	}
	return api;
}

function getOptions(method = "GET", signal: AbortSignal | null = null, body: object|null = null) {
	return {
		baseUrl,
		mode: "cors",
		credentials: "include",
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json',
		},
		method,
		signal,
		body: body ? JSON.stringify(body) : null,
	} as const;
};

async function csrf(signal: AbortSignal | null = null) {
	const res = await fetch('/sanctum/csrf-cookie', getOptions('GET', null, signal));
	if(!res.ok) throw new Error('Failed to get CSRF token');
	return res;
};
