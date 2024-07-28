import initialize from '@/functions/initialize';
import { useEffect, MouseEvent } from 'react';
import BaseGroupProps from '@/types/BaseGroupProps';
import GroupValue from '@/types/GroupValue';
import useList from '@/functions/useList';
import Input from './Input';
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import { FiX } from '@react-icons/all-files/fi/FiX';

type IterableGroupProps<T extends readonly InputAttribute[]> = BaseGroupProps<T, GroupValue<T>[]> & { id: string; };
export default function IterableGroup<T extends readonly InputAttribute[]>({ id, model, value, onChange }: IterableGroupProps<T>) {
	const { list, add, remove, update } = useList<GroupValue<T>>(value ?? [initialize(model)], onChange);
	useEffect(() => {
		onChange([initialize(model)]);
	}, [model]);
	function handleAdd(e: MouseEvent) {
		e.preventDefault();
		const newItem: GroupValue<T> = initialize(model);
		add(newItem);
	}
	function handleChange(id: number, name: keyof GroupValue<T> & string, value: GroupValue<T>[keyof GroupValue<T>]) {
		update(id, name, value);
	}
	function handleDelete(id: number) {
		remove(id);
	}
	return <div id={id} className='grid justify-start gap-2 m-3'>
		{list.map((item) => (
			<div key={item.managed_list_id} className='relative flex flex-row items-start gap-2 px-4 pt-2 pb-6 box-border transition-colors has-[button:hover]:bg-stone-200/10 has-[button:hover]:shadow rounded-xl'>
				{model.map((field: InputAttribute, i) => (
					<Input
						id={item.managed_list_id + field.name}
						key={item.managed_list_id + field.name}
						prop={field}
						handleChange={(key: string, value: any) => handleChange(item.managed_list_id, key, value)}
						//@ts-expect-error
						value={item[field.name]}
					/>
				))}
				<button
					type='button'
					className='absolute right-1 top-1 size-7 flex items-center justify-center rounded-2xl border-none bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white hover:shadow active:text-slate-900 active:bg-stone-900/5'
					onClick={() => handleDelete(item.managed_list_id)}><FiX /></button>
			</div>
		))}
		<button
			className='group/add relative min-h-[3rem] h-full w-full flex items-center justify-center border-solid border-2 border-slate-100 rounded-xl hover:border-slate-200 active:border-slate-300'
			onClick={handleAdd}>
			<div className="absolute z-20 text-2xl size-8 p-2 grid items-center justify-center rounded-full text-slate-400 group-hover/add:text-slate-600 group-hover/add:bg-white group-hover:shadow group-active/add:text-slate-900"><FiPlus /></div>
			<div className="absolute transition-colors z-10 bg-slate-50/90 group-hover/add:bg-slate-50/60 w-full h-full"></div>
			<div className="text-start px-4 pt-2 pb-6 flex flex-row gap-2 w-fit pointer-events-none">
				{model.map((field: InputAttribute, i) => (
					<Input key={field.name} id={id + i} prop={field} handleChange={() => { }} value={""} />
				))}
			</div>
		</button>
	</div>;
}