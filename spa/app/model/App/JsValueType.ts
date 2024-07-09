import ValueTypeOption from './ValueTypeOption';

type JsValueType<T extends ValueTypeOption> = |
	T extends "varchar" | "text"
	? string
	: T extends "integer" | "double"
	? number
	: T extends "boolean"
	? boolean
	: T extends "array"
	? any[]
	: T extends "blob"
	? Blob
	: T extends "date" | "time" | "datetime"
	? Date
	: T extends "reference"
	? number
	: null;

export default JsValueType;