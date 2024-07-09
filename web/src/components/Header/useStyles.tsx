import {CSSProperties} from 'react';
export default function useStyles(props?:CSSProperties):{[name:string]:CSSProperties} {
	return ({
		base:{
			display:'grid',
			margin:0,
			padding:0,
			...props
		}
	})
}
