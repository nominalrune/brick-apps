import type {IPostData}from 'Post/Post';


import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export function PostCard({post}:{post:IPostData}){
	
	
	return (
		<Card elevation={5} style={{margin:"2rem",padding:"1rem"}}>
			<Typography fontSize={"2rem"}>
				{post.title}
			</Typography>
			<p>{post.content}</p>
		</Card>
	)
}
