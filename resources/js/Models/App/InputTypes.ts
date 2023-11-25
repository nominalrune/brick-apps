export type InputTypeOption = "text" | "textarea" | "number" | "select" | "radio" | "checkbox" | "datetime" | "year" | "month" | "date" | "time" | "reference" | "file";
export type InputValueTypeOption = "varchar" | "text" | "integer" | "double" | "boolean" | "json" | "blob" | "date" | "time" | "datetime" | "reference";
export type ReferringAppCode = string;
export type InputTypeInJS<T extends InputValueTypeOption> = |
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
export const paletteItems = ["text", "number", "date", "time", "checkbox", "color"] as const;

export const defaultValueTypeMap = {
    "text":"varchar",
    "textarea":"text",
    "number":"double",
    "select":"varchar",
    "radio":"varchar",
    "checkbox":"boolean",
    "datetime":"datetime",
    "year":"date",
    "month":"date",
    "date":"date",
    "time":"time",
    "reference":"reference",
    "file":"blob",
} as const;
