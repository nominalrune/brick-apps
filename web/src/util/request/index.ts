/**
 * It takes a URL and a method, and returns a promise that resolves to the response data
 * @param {string} url - The URL to fetch.
 * @returns reponce data or error from the server
 */
export async function get<ResponseData>(url: string) {
	return _fetch<ResponseData>(url, "GET");
};

/**
 * It takes a URL and an optional data object, and returns a promise that resolves to the response
 * @param {string} url - The url to fetch
 * @param {object} [data] - The data to send to the server.
 * @returns reponce data or error from the server
 */
export async function post<ResponseData>(url: string, data?: object) {
	return _fetch<ResponseData>(url, "POST");
};

/**
 * It fetches data from a url and returns the data as a json object.
 * @param {string} url - The URL to fetch.
 * @param {'GET'|'POST'|'PUT'|'DELETE'} method - The HTTP method to use.
 * @param {object?} [data] - The data to send to the server.
 * @returns A promise that resolves to a JSON object.
 */
async function _fetch<Res>(url: string, method: 'GET'|'POST'|'PUT'|'DELETE',data?:object) {
	return fetch(url, {
		method: method,
		mode: 'cors',
		headers: new Headers({
			"Access-Control-Allow-Origin": new URL(url).host,
			"Cross-Origin-Resource-Policy": "cross-origin",
			"Content-Security-Policy": "cross-origin",
			'Accept': 'application/json',
		}),
		referrerPolicy: 'no-referrer',
		credentials: "include",
		...(data?data:{})
	})
		.then<Res>(res => res.json());
}
