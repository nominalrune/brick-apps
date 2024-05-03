import { json } from '@remix-run/node';
import config from '~/config';

export default class Api {
	private baseUrl: string;
	constructor() {
		this.baseUrl = config.baseUrl;
	}
	getOptions(method = "GET", signal: AbortSignal | null = null) {
		return {
			mode: "cors",
			credentials: "include",
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json',
			},
			method,
			signal,
		} as const;
	};
	private async getCsrfToken() {
		return await fetch(`${this.baseUrl}/auth/csrf-cookie`, this.getOptions('GET'));
	};
	private async request(method: string, urlPath: string, body?: object) {
		const url = new URL(urlPath, this.baseUrl);
		await this.getCsrfToken();
		const controller = new AbortController();
		// try {
		const response = fetch(
			url, {
			...this.getOptions(method, controller.signal),
			body: JSON.stringify(body),
		});
		const json = () => response.then(res=>res.json());
		return { response, controller, json };
		// 	if (response.ok) {
		// 		return await response.json();
		// 	} else {
		// 		throw response;
		// 	}
		// } finally {
		// 	controller.abort();
		// }
	}
	async get(url: string) {
		return await this.request('GET', url);
	}
	async post(url: string, body: object) {
		return await this.request('POST', url, body);
	}
	async put(url: string, body: object) {
		return await this.request('PUT', url, body);
	}
	async delete(url: string) {
		return await this.request('DELETE', url);
	}
}
