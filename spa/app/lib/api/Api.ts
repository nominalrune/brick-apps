import Url from '../Url/Url';
import config from '~/config';
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export default class Api {
	private csrfTokenPath = 'auth/csrf-cookie';
	private baseUrl: Url;
	constructor(
		baseUrl: string | URL = config.baseUrl
	) {
		this.baseUrl = new Url(baseUrl);
	}
	getOptions(method: Method, signal: AbortSignal | null = null) {
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
		return await fetch(this.baseUrl.withAppendedPath(this.csrfTokenPath), this.getOptions('GET'));
	};
	/**
	 *
	 * @param method
	 * @param urlPath
	 * @param param optional `{ body, searchParams, signal}` properties.
	 * @returns promise of json response
	 * @throws {Response} if its code is greater than or equals to  400
	 */
	private async request(method: Method, urlPath: string | URL, { body, searchParams, signal }: { body?: object, searchParams?: object; signal?: AbortSignal | null; } = { body: {}, searchParams: {}, signal: null }) {
		const url = this.baseUrl.withAppendedPath(urlPath).withQuery(searchParams ?? {});
		await this.getCsrfToken();
		// try {
		const response = await fetch(
			url, {
			...this.getOptions(method, signal),
			body: JSON.stringify(body),
		});
		if (response.ok) {
			return await response.json();
		} else {
			throw response;
		}
		// } finally {
		// 	controller.abort();
		// }
	}
	async get(url: string | URL, searchParams?: object, signal?: AbortSignal) {
		return await this.request('GET', url, { searchParams, signal });
	}
	async post(url: string | URL, body: object, signal?: AbortSignal) {
		return await this.request('POST', url, { body, signal });
	}
	async put(url: string | URL, body: object, signal?: AbortSignal) {
		return await this.request('PUT', url, { body, signal });
	}
	async delete(url: string | URL, signal?: AbortSignal) {
		return await this.request('DELETE', url, { signal });
	}
}
