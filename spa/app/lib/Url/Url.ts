// type SimpleObject = {
// 	[key: string]: string
// 	| number
// 	| boolean
// 	| string[]
// 	| number[]
// 	| boolean[]
// 	| SimpleObject
// 	| SimpleObject[];
// };

export default class Url extends URL {
	constructor(url: string | URL, base?: string | URL) {
		super(url, base);
	}
	withAppendedPath(path: string | URL): Url {
		const newUrl = new Url(this);
		const _path = path.toString().replace(/^\//, "");
		newUrl.pathname = newUrl.pathname + _path;
		return newUrl;
	}
	/** NOTE
	 * 1. this only works for PHP framework
	 */
	private appendArrayToQuery(key: string, query: string[] | number[] | boolean[] | object[]) {
		const newUrl = new Url(this);
		query.forEach(item => {
			newUrl.searchParams.append(`${key}[]`, typeof item === "object" ? JSON.stringify(item) : item.toString());
		});
		return newUrl;
	}
	withQuery(query: object): Url {
		const newUrl = new Url(this);
		Object.entries(query).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				newUrl.appendArrayToQuery(key, value);
			} else if (value === null || value === undefined) {
				// skip
			} else {
				newUrl.searchParams.append(key, value.toString());
			}
		});
		return newUrl;
	}
}