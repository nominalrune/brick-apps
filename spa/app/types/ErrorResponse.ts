export default interface ErrorResponse {
	errors: {name: string, message: string;}[];
	message: string;
}