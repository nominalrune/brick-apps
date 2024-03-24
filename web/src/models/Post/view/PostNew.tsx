import { useState } from 'react';

import { create } from 'Post/query/create';
import { useNavigate } from "react-router-dom";

import { TextInput } from 'components/common/input';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export function PostNew({ userId }: { userId: number; }) {
	const [postData, setPostData] = useState({ title: "", content: "" });
	const navigate=useNavigate();
	const handleChange = (key_label: string) => (e: any) => {
		setPostData({ ...postData, [key_label]: e.target.value });
	};
	async function doCreate() {
		console.table(postData);
		const post = await create(postData, userId);
		navigate("/post/" + post.id);
	}

	return (
		<Stack component={"form"} spacing={4} alignItems="center" aria-label='lognew'>
			<TextInput name='title' label='Title' type='text' onChange={handleChange('title')} value={postData.title} />
			<TextInput name='content' label='Content' type='text' onChange={handleChange('content')} value={postData.content} />

			<Button endIcon={<SendIcon />} onClick={doCreate}>
				create
			</Button>
		</Stack>
	);
}
