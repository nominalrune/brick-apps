type MethodKeys<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

type WithoutMethodsOfPropModel<T> = {
	[K in keyof T]: T[K] extends {toJSON:()=>object}[]
	? WithoutMethods<T[K][number]>[]
	: (T[K] extends {toJSON:()=>object} | null
		? WithoutMethods<Exclude<T[K], null>> | null
		: T[K]);
};

type WithoutMethods<T> = WithoutMethodsOfPropModel<Omit<T, MethodKeys<T>>>;

export default WithoutMethods;