import { FC, useState, ChangeEvent } from 'react';
import { LoginProp } from './propType';

import { useNavigate } from "react-router-dom";

import {login} from 'User/query/session/login';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import {PasswordInput, EmailInput} from "components/common/form";

export const Login: FC<LoginProp> = (props) => {
	const { set, children, ...attr } = props;
	const [values, setValues] = useState({ email: "", password: "" });
	const handleChange = (key_label: string) => (e: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [key_label]: e.target.value });
	};
	const navigator=useNavigate()
	function doLogin(e:React.MouseEvent){
		login({email:values.email,password:values.password}, set,navigator,"/")
	}
	return (
		<Stack component={"form"} spacing={4} alignItems="center" aria-label='login'>
			<EmailInput value={values.email} handleChange={handleChange("email")} />
			<PasswordInput value={values.password} handleChange={handleChange("password")} />
			<Button endIcon={<SendIcon />} onClick={doLogin}>
			login
		</Button>
		</Stack>
	);
};
