type Named<T, Name extends string> = T & { name: Name; };
export default Named;