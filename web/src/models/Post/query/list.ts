import { IPostData } from 'Post/Post';
import { objectToQuery } from 'util/url/objectToQuery';

import {get} from 'util/request';
import { backendUrl as _backendUrl } from 'config/backend';

export async function list(
	userId:number,
	backendUrl = _backendUrl
) {
	const posts = await get<IPostData[]>(`http://${backendUrl}/post?user=${userId}`);
	return posts;
}
