import Url from '../Url/Url';

type Method = 'GET'|'POST'|'PUT'|'PATCH'|'DELETE';

export default class Api {
	private csrfTokenPath = 'auth/csrf-cookie';
	private baseUrl : Url;
	constructor(
		baseUrl:string|URL
	) {
		this.baseUrl = new Url(baseUrl);
	}
	getOptions(method:Method, signal: AbortSignal | null = null) {
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
	private async request(method: Method, urlPath: string|URL, body?: object, searchParams?:object) {
		const url = this.baseUrl.withAppendedPath(urlPath).withQuery(searchParams??{});
		await this.getCsrfToken();
		const controller = new AbortController();
		// try {
		const response = await fetch(
			url, {
			...this.getOptions(method, controller.signal),
			body: JSON.stringify(body),
		});
		// const json = () => response.then<unknown>(res=>res.json());
		return await response.json();
		// 	if (response.ok) {
		// 		return await response.json();
		// 	} else {
		// 		throw response;
		// 	}
		// } finally {
		// 	controller.abort();
		// }
	}
	async get(url: string|URL, searchParam?:object) {
		return await this.request('GET', url, undefined, searchParam);
	}
	async post(url: string|URL, body: object) {
		return await this.request('POST', url, body);
	}
	async put(url: string|URL, body: object) {
		return await this.request('PUT', url, body);
	}
	async delete(url: string|URL) {
		return await this.request('DELETE', url);
	}
}
