import { useRef } from 'react';

export default function useId(initialId: number = 0) {
	const next = useRef(initialId);
	const issue=():number=>{
		return ++next.current;
	}
	return issue;
}