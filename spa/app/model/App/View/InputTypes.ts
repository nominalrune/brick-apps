import ValueTypeOption from '../ValueTypeOption';

export type InputTypeOption = "text" | "textarea" | "number" | "select" | "radio" | "checkbox" | "datetime-local" | "month" | "date" | "time" | "reference" | "file";
export type ReferringAppCode = string;
export const inputItems = ["text", "textarea", "number", "select", "radio", "checkbox", "datetime-local", "month", "date", "time", "reference", "file"] as InputTypeOption[];

export const defaultValueTypeMap: Record<InputTypeOption, ValueTypeOption> = {
	"text": "varchar",
	"textarea": "text",
	"number": "double",
	"select": "varchar",
	"radio": "varchar",
	"checkbox": "boolean",
	"datetime-local": "datetime",
	"month": "date",
	"date": "date",
	"time": "time",
	"reference": "reference",
	"file": "blob",
} as const;
