type MethodKeys<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];
type WithoutMethodsOfPropModel<T> = {
	[K in keyof T]: T[K] extends (infer U)[]
	? WithoutMethodsOfPropModel<U>[]
	: (T[K] extends object
		? WithoutMethods<Exclude<T[K], null>>
		: T[K]);
};

type WithoutMethods<T> = WithoutMethodsOfPropModel<Omit<T, MethodKeys<T>>>;

export default WithoutMethods;