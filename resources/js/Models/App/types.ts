export type InputTypeOption = "text" | "textarea" | "integer" | "double" | "select" | "radio" | "checkbox" | "datetime" | "time" | "reference" | "file";
export type InputValueTypeOption = "varchar" | "text" | "integer" | "double" | "boolean" | "json" | "blob" | "date" | "time" | "datetime" | "reference";
export type ReferringAppName = string;
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
