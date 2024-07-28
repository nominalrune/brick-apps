import { ChangeEvent } from 'react';
import CheckboxLabel from './CheckboxLabel';
import Fieldset from './Fieldset';
import { RadioAttr } from '@/types/commonTypes';

export default function Radio(
	{ label, options, multiple, name, value, onChange, type: _, ...prop }: RadioAttr<string> & { value: any, onChange: (e: ChangeEvent<HTMLInputElement>) => void; },
) {
	const type = multiple ? 'checkbox' : 'radio';
	const handleChange = multiple ? (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = (value.includes(e.target.value))
			? value.filter((v: string | number) => v !== e.target.value)
			: [...value, e.target.value];
		onChange({ ...e, target: { ...e.target, value: newValue } });
	} : onChange;
	return <Fieldset label={label} overflowScroll={false} className='p-0'>
		<div className='p-2'>
		{
			options.map(([label, itemValue]) => <CheckboxLabel key={type + name + itemValue} label={label}>
				<input type={type}
					{...prop}
					name={name}
					value={itemValue}
					onChange={handleChange} />
			</CheckboxLabel>
			)}
			</div>
	</Fieldset>;
}