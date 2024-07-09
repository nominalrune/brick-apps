import type {ILogData}from "../ILogData";

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export function LogCard(log:ILogData){
	
	return (
		<Card>
			<Typography fontSize={3}>
				{log.title}
			</Typography>
			<p>{log.date.toISOString()}</p>
			<p>{log.detail}</p>
		</Card>
	)
}
