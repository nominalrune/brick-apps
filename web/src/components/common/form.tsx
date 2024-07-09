import { ChangeEvent } from 'react';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";


type InputParam = {
	value: string;
	handleChange?: (e: ChangeEvent<HTMLInputElement>) => void,
	placeholder?: string,
	errorMsg?: string;
};

export const NameInput = (p: InputParam) => {
	const { value, handleChange, placeholder, errorMsg } = p;
	return (
		<TextField
			label="Name"
			defaultValue={value}
			onChange={handleChange}
			name="name"
			type="name"
			placeholder={placeholder}
			helperText={errorMsg}
			aria-invalid={
				Boolean(errorMsg) ||
				undefined
			}
		/>
	);
};

export const EmailInput = (p: InputParam) => {
	const { value, handleChange, placeholder, errorMsg } = p;
	return (
		<TextField
			label="Email"
			defaultValue={value}
			onChange={handleChange}
			name="email"
			type="email"
			placeholder={placeholder}
			helperText={errorMsg}
			aria-invalid={
				Boolean(errorMsg) ||
				undefined
			}
		/>
	);
};
export const PasswordInput = (p: Omit<InputParam, "placeholder">) => {
	const { value, handleChange, errorMsg } = p;
	return (
		<TextField
			label="Password"
			defaultValue={value}
			onChange={handleChange}
			name="password"
			type="password"
			helperText={errorMsg}
			aria-invalid={
				Boolean(errorMsg) ||
				undefined
			}
		/>
	);
};
