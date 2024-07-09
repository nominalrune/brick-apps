type OmitId<T, Id extends string> = Omit<T, Id>;
type OmitIdOfPropModel<T, Id extends string> = {
	[K in keyof T]: T[K] extends object[]
	? OmitId<T[K][number], Id>[]
	: (T[K] extends object | null
		? OmitId<Exclude<T[K], null>, Id> | null
		: T[K]);
};

type WithoutId<T, Id extends string = "id"> = OmitIdOfPropModel<OmitId<T, Id>, Id>;
export default WithoutId;