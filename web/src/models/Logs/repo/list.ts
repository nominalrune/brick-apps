import { ILogData } from 'Logs/ILogData';
import { objectToQuery } from 'util/url/objectToQuery';

import { backendUrl as _backendUrl } from 'config/backend';

export async function list(
	userId:number,
	backendUrl = _backendUrl
) {
	const posts = await fetch(`http://${backendUrl}/log?user=${userId}`, {
		method: "GET",
		mode: 'cors',
		headers: new Headers({
			"Access-Control-Allow-Origin": backendUrl,
			"Cross-Origin-Resource-Policy": "cross-origin",
			"Content-Security-Policy": "cross-origin",
			'Accept': 'application/json',
		}),
		referrerPolicy: 'no-referrer',
		credentials: "include"
	})
		.then<ILogData[]>(res => res.json());
	return posts;
}
