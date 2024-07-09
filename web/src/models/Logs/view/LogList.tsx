import type { ILogData } from "../ILogData";
import { list } from "Logs/repo/list";

import { useQuery } from 'react-query';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
type p = { userId: number };
export function LogList({ userId }: p) {
	const { isLoading, isError, data, error } = useQuery(['logs', userId], () => list(userId));
	return (
		<Stack component={"div"} spacing={4} alignItems={"center"} aria-label='login'>
			{data && data.map((log, i) => (
				<Box key={i}>
					<Typography fontSize={3}>
						{log.title}
					</Typography>
					<p>{log.date}</p>
					<p>{log.detail}</p>
					<hr />
				</Box>
			))}
		</Stack>
	);

}
