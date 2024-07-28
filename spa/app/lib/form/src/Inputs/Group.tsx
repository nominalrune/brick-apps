import initialize from '@/functions/initialize';
import BaseGroupProps from '../types/BaseGroupProps';
import { useEffect } from 'react';
import Input from './Input';
import GroupValue from '@/types/GroupValue';
import AttributeBase from '@/types/AttributeBase';
type GroupProps<T extends readonly AttributeBase[]> = BaseGroupProps<T, GroupValue<T>> & { direction: "horizontal" | "vertical"; id: string; };
export default function Group<T extends readonly AttributeBase[]>({ id, model, value, onChange, direction }: GroupProps<T>) {
	useEffect(() => {//@ts-expect-error
		onChange(initialize(model));
	}, [model]);
	function handleChange(name: string, _value: any) {
		if (!name) return;
		onChange({ ...value, [name]: _value });
	}
	return <div className={`flex ${direction === "horizontal" ? "flex-row overflow-x-auto" : "flex-col"} gap-4`}>
		{//@ts-expect-error
			model.map((prop) => <Input key={id + 'input_group_' + prop.name} id={id} prop={prop} value={value?.[prop.name]} handleChange={handleChange} />)
		}
	</div>;
}