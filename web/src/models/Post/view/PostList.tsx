import type { IPostData } from "Post/Post";
import { list } from "Post/query/list";

import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";


import {PostCard} from "./PostCard";
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
type p = { userId: number };
export function PostList({ userId }: p) {
	const { isLoading, isError, data, error } = useQuery(['posts'], async () => {
		console.log("POstList, will call list");
		return await list(userId);
	});
	const navigate=useNavigate();
	function handleClick(){
		navigate("/post/new");
	}
		return data
	? 
		<>
		<Stack key="a" component={"div"} spacing={4} alignItems={"center"} aria-label='login'>
			{  data.map((post, i) => (
				<PostCard key={i} post={post}/>
			))}
		</Stack>
		<Fab key="b" color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>
	  </>
	: <div>loading...</div>;
}
