import { ChangeEvent } from 'react';

import TextField from "@mui/material/TextField";

type TextInputParam = {
	name:string,
	label?:string,
	type?:"text"|"email"|"password"|"number"|"url"|"tel"|"date"|"time",
	value: string,
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
	placeholder?: string,
	/**
	 * returns error message if it's not valid.
	 * @param targetValue [string] target string to validate
	 * @returns [string|undefined] `undefined` if valid; `error message` if invalid.
	 */
	validator?:(targetValue:string)=>string|undefined
};

export const TextInput = ({
	name,
	label,
	type="text",
	value,
	onChange,
	validator=()=>undefined,
	placeholder
}: TextInputParam) => {
	return (
		<TextField
			label={label??name}
			defaultValue={value}
			onChange={onChange}
			name={name}
			type={type}
			placeholder={placeholder}
			helperText={validator(value)}
			aria-invalid={
				Boolean(validator(value)) ||
				undefined
			}
		/>
	);
};
