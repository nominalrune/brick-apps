import { ChangeEvent, ComponentProps, } from 'react';
// import Select from 'react-select'
export default function SelectInput(
	{ type, name, id, value, className, options, isFocused, multiple, defaultValue, onChange, ...rest }: { type?: string, name: string, id?: string, value?: string | number, className?: string, options: readonly (readonly [label: string, value: string | number])[], autoComplete?: string, isFocused?: boolean, onChange: (e: ChangeEvent<HTMLInputElement>) => any; } & Omit<ComponentProps<'input'>, 'ref'>
) {
	const _options = options.map(([label, value]) => ({ label, value }));
	return (
		<span className={className}>
			<select
				name={name}
				id={id ?? name}
				autoFocus={false}
				// defaultValue={_options.filter(op => String(op.value).toString() === String(defaultValue).toString())[0]}
				value={_options.filter(op => String(op.value).toString() === String(value).toString())[0].value}
				className={"p-[1px] inline-block " + className}
				onChange={(e) => {
					onChange(e);
				}}
			>{
			options.map(([label, value]) => (<option value={value}>{label}</option>))
			}</select>
			{/* <Select
                {...rest}
                name={name}
                id={id ?? name}
                autoFocus={false}
                // defaultValue={_options.filter(op => String(op.value).toString() === String(defaultValue).toString())[0]}
                value={_options.filter(op => String(op.value).toString() === String(value).toString())[0]}
                className={"p-[1px] inline-block " + className}
                unstyled={true}
                classNames={{//@ts-expect-error
                    control: ({ isDisabled, isFocused }) =>
                        `p-2 border-[1px] border-gray-300 outline-2 outline-offset-2 outline-transparent focus-within:border-indigo-500 focus-within:ring-offset-white focus-within:ring-indigo-500 rounded-md shadow-sm`,
                    input: () => 'opacity-0',//@ts-expect-error
                    option: ({ isDisabled, isFocused, isSelected }) => 'py-1 px-2 rounded-sm bg-white hover:bg-indigo-100 focus:bg-indigo-200',
                    menu: () => 'border-[1px] shadow-sm rounded-md m-1',
                    multiValue: () => 'bg-slate-50 border-[1px] shadow-sm rounded-lg px-2 py-[0.1rem] mx-1',
                    multiValueLabel: () => 'text-slate-800',
                    multiValueRemove: () => 'text-slate-600',
                    indicatorsContainer: () => 'text-slate-700',
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        '--tw-ring-shadow': state.isFocused ? 'var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)' : "0 0 transparent",
                    }),
                }}//@ts-expect-error
                onChange={(e) => { onChange({ target: { name,
                    value: e instanceof Array
                    ? e.map(i => i.value) : e?.value ?? e } }) }}
                isMulti={multiple}
                options={_options}
            /> */}
		</span>
	);
};
