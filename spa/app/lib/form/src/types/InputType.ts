export type NativeInputType = "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "tel" | "text" | "time" | "url" | "week";
export type OtherInputType = "checkbox" | "select" | "textarea" | "group" | "iterable-group";
type InputType = NativeInputType | OtherInputType;
export default InputType;