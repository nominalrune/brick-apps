import { useEffect, useState } from 'react';
import useId from './useId';
export type WithId<T> = T & {
	managed_list_id: number;
};
export default function useList<T>(original: T[], setter: (value: T[]) => any) {
	const issue = useId(original.length - 1);
	const [list, setList] = useState<WithId<T>[]>(() => original.map(withId));
	useEffect(() => {//@ts-expect-error
		setter(list.map(withoutId));
	}, [list]);
	function withId<T>(obj: T, id = issue()): WithId<T> {
		return { managed_list_id: id, ...obj };
	}
	function withoutId<T extends { managed_list_id: number; }>(obj: T): Omit<T, "managed_list_id"> {
		const { managed_list_id, ...rest } = obj;
		return rest;
	}
	function add(initialValue: T) {
		const newItem = withId(initialValue);
		setList([...list, newItem]);
	}
	function remove(id: number) {
		setList(list => list.filter(item => item.managed_list_id !== id));
	}
	function update(id: number, key: string, value: any) {
		setList(list => list.map(item => item.managed_list_id === id ? { ...item, [key]: value } : item));
	}
	function clear() {
		setList([]);
	}
	function replace(newList: T[]) {
		setList(newList.map(withId));
	}
	return { list, add, remove, update, clear, replace };
}