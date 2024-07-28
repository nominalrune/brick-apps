import { ComponentProps } from 'react';
type Prop = {
    underlineStyle?: boolean;
    options?: readonly (readonly [label: string, value: string | number])[];
    name: string;
} & Omit<ComponentProps<"input">, 'ref' | 'prefix'>;

export default function TextInput(
    { type, name, id, value, className, autoComplete, required, onChange, underlineStyle, defaultValue, options, ...rest }: Prop
) {
    const classString = underlineStyle
        ? "border-0 border-b-2 border-gray-300 empty:border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 invalid:border-red-300 focus:invalid:border-red-300 focus:invalid:ring-red-300 backdrop-blur "
        : "border-gray-300 empty:border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 invalid:border-red-300 focus:invalid:border-red-300 focus:invalid:ring-red-300 rounded-[.2rem] shadow-sm ";

    return (<>
        <input
            maxLength={128}
            min={-99999}
            max={99999}
            {...rest}
            type={type}
            name={name}
            id={id}
            value={value}
            autoFocus={false}
            className={
                classString + className
            }
            autoComplete={autoComplete}
            required={required}
            onChange={onChange}
            list={name + '_list'}
        />
        {options && options.length > 0 && <datalist id={name + '_list'}>
            {options.map(([label, value]) => <option key={name + value} value={value}>{label}</option>)}
        </datalist>}
    </>
    );
}
