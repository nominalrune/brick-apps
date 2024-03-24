import type {IPostData}from 'Post/Post';

import {useParams,Link} from 'react-router-dom';

import { useQuery,useQueryClient, } from 'react-query';
import { get } from 'Post/query/get';

import { PostCard } from './PostCard';
import Button from '@mui/material/Button';

export function PostDetail() {
	const queryClient=useQueryClient()
	const id=parseInt(useParams()?.id??"invalid query!!"); // TODO better we separate react-router-dom and view, so that the Post domain be independent of router system?
	console.log({id})
	const {data}=useQuery([`post`,id],async ()=>{
		console.log("using query in post detail")
		const post= await get(id);
		console.log("PostDetail: get finished",{post})
		return post;
	})
	
	if(isNaN(id)){return  <>404 you are wrong.</>}
	console.log({data})
	return <>
	{data 
			? <PostCard post={data} />
			: <div>loading...</div>
			}
			<Link to={`/post/${id-1}`}><Button variant='contained'>prev</Button></Link>
			<Link to={`/post/${id+1}`}><Button variant='contained'>next</Button></Link>
			</>
}
