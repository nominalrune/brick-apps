import {FC, useState, ChangeEvent} from 'react';
import {RegisterProp} from './propType'

import {register} from 'User/query/session/register';

import { useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import {NameInput,PasswordInput, EmailInput} from "components/common/form";

export const Register: FC<RegisterProp> =(props) => {
	const { set, children, ...attr } = props;
	const [values, setValues] = useState({name:"", email: "", password: "" });
	const handleChange = (key_label: string) => (e: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [key_label]: e.target.value });
	};
	const navi=useNavigate()
	function doRegister(e:React.MouseEvent){
		register({name:values.name,email:values.email,password:values.password},set, navi,"/")
	}
	
	return (
		<Stack component={"form"} spacing={4} alignItems="center" aria-label='register'>
			<NameInput value={values.name} handleChange={handleChange("name")} />
			<EmailInput value={values.email} handleChange={handleChange("email")} />
			<PasswordInput value={values.password} handleChange={handleChange("password")} />
			<Button endIcon={<SendIcon />} onClick={doRegister}>
			login
		</Button>
		</Stack>
	);
};
