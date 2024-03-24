import {useState}from 'react';
import type {ILogData}from "../ILogData";

import {TextInput}from 'components/common/input';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export function LogNew({user}:{user?:unknown}){
	const [postData, setPostData] = useState({title:"",detail:"",date:"",timeFrom:"",timeTo:"",subject:""})
	const handleChange = (key_label: string) => (e: any) => {
		setPostData({ ...postData, [key_label]: e.target.value });
	};
	function doCreate(){
		console.table(postData)
	}
	
	return (
		<Stack component={"form"} spacing={4} alignItems="center" aria-label='lognew'>
			<TextInput name='title' label='Title' type='text'  onChange={handleChange('title')} value={postData.title} />
			<TextInput name='date' label='date' type="date"  onChange={handleChange('date')} value={postData.date} />
			<TextInput name='timeFrom' label='timeFrom' type='time'  onChange={handleChange('timeFrom')} value={postData.timeFrom} />
			<TextInput name='timeTo' label='timeTo' type='time'  onChange={handleChange('timeTo')} value={postData.timeTo} />
		<TextInput name='detail' label='Detail' type='text' onChange={handleChange('detail')} value={postData.detail} />
		
		
		<Button endIcon={<SendIcon />} onClick={doCreate}>
			login
		</Button>
		</Stack>
	)
}
