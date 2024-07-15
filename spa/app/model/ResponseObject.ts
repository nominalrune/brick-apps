export default ResponseObject;
type ResponseObject<T = any> = {
	message: string,
	errors: { name: string, message: string; }[],
} | T;