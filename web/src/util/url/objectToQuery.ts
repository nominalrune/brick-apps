// type Query<K extends string> =K extends keyof infer O ?O[K] extends string? `${K}:${O[K]}`:"":"";
// type QQuery<O> =keyof O extends string?O[keyof O] extends string?`${keyof O}:${O[keyof O]}`:"":"";
// type QQQuery<O> =keyof O extends string?O[keyof O] extends string?`?${keyof O}:${O[keyof O]}`:"":"";
export function objectToQuery(obj:object) {
	const q=Object.entries(obj).map(
		([k,v])=>k?.toString()&&v?.toString()
		?`${encodeURI(k?.toString())}=${encodeURI(v?.toString())}`
		:""
		).filter(i=>i).join('&');
	return q;
}
