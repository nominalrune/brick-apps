import type { IPostInputData, IPostData } from 'Post/Post';
import { objectToQuery } from 'util/url/objectToQuery';

import { backendUrl as _backendUrl } from 'config/backend';

export async function update(
	postInput: IPostInputData&{id:number},
	backendUrl = _backendUrl
) {
	const {id,...query}=postInput;
	const post = await fetch(`http://${backendUrl}/log/${id}/edit?${objectToQuery(query)}`, {
		method: "POST",
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
		.then<ILogData>(res => res.json());
	return post;
}
