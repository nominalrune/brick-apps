import { IPostData } from 'Post/Post';
import { objectToQuery } from 'util/url/objectToQuery';

import {get as _get} from 'util/request';
import { backendUrl as _backendUrl } from 'config/backend';

export async function get(
	id: number,
	backendUrl = _backendUrl
) {
const post = await _get<IPostData>(`http://${backendUrl}/post?id=${id}`);
	return post;
}
